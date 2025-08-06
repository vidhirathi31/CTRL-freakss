// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// DOM Elements
const userSelect = document.getElementById('user-select');
const assetsTableBody = document.getElementById('assets-table-body');
const assetForm = document.getElementById('asset-form');

// Global State
let currentUser = null;
let assets = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  setupEventListeners();
});

// API Functions
async function fetchApi(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  
  if (data) options.body = JSON.stringify(data);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return await response.json();
}

async function loadUsers() {
  try {
    const users = await fetchApi('/users');
    populateUserSelect(users);
  } catch (error) {
    console.error('Error loading users:', error);
    alert('Failed to load users. Please try again.');
  }
}

async function loadUserAssets(userId) {
  try {
    assets = await fetchApi(`/assets/user/${userId}`);
    renderAssetsTable();
    renderChart();
    document.getElementById('portfolio-section').classList.remove('hidden');
    document.getElementById('performance-section').classList.remove('hidden');
  } catch (error) {
    console.error('Error loading assets:', error);
    assets = [];
    renderAssetsTable();
  }
}

async function saveAsset(assetData) {
  const endpoint = assetData.id ? `/assets/${assetData.id}` : '/assets';
  const method = assetData.id ? 'PUT' : 'POST';
  
  try {
    const savedAsset = await fetchApi(endpoint, method, assetData);
    if (assetData.id) {
      assets = assets.map(a => a.id === assetData.id ? savedAsset : a);
    } else {
      assets.push(savedAsset);
    }
    return savedAsset;
  } catch (error) {
    console.error('Error saving asset:', error);
    throw error;
  }
}

async function deleteAsset(assetId) {
  try {
    await fetchApi(`/assets/${assetId}`, 'DELETE');
    assets = assets.filter(a => a.id !== assetId);
    return true;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
}

// UI Functions
function populateUserSelect(users) {
  userSelect.innerHTML = '';
  
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a user';
  userSelect.appendChild(defaultOption);
  
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
}

function renderAssetsTable() {
  assetsTableBody.innerHTML = '';
  
  if (assets.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5">No assets found. Add your first asset!</td>`;
    assetsTableBody.appendChild(row);
    return;
  }
  
  assets.forEach(asset => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${asset.assetName}</td>
      <td>$${asset.currentValue.toFixed(2)}</td>
      <td>${asset.quantity}</td>
      <td>$${asset.totalValue.toFixed(2)}</td>
      <td>
        <button class="btn-secondary action-btn edit-btn" data-id="${asset.id}">Edit</button>
        <button class="btn-secondary action-btn delete-btn" data-id="${asset.id}">Delete</button>
      </td>
    `;
    assetsTableBody.appendChild(row);
  });
  
  // Add event listeners to new buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => editAsset(parseInt(btn.dataset.id)));
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDelete(parseInt(btn.dataset.id)));
  });
}

// ... (keep all other existing UI functions like renderChart, editAsset, etc.)

// Event Listeners
function setupEventListeners() {
  userSelect.addEventListener('change', async (e) => {
    const userId = parseInt(e.target.value);
    if (userId) {
      currentUser = userId;
      await loadUserAssets(userId);
    }
  });

  assetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(assetForm);
    const assetData = {
      id: formData.get('asset-id') ? parseInt(formData.get('asset-id')) : null,
      userId: currentUser,
      assetName: formData.get('asset-name'),
      assetType: formData.get('asset-type'),
      currentValue: parseFloat(formData.get('current-value')),
      quantity: parseFloat(formData.get('quantity')),
      totalValue: parseFloat(formData.get('current-value')) * parseFloat(formData.get('quantity'))
    };

    try {
      await saveAsset(assetData);
      closeModal();
      renderAssetsTable();
      renderChart();
    } catch (error) {
      alert('Error saving asset: ' + error.message);
    }
  });
}

async function confirmDelete(assetId) {
  if (confirm('Are you sure you want to delete this asset?')) {
    try {
      await deleteAsset(assetId);
      renderAssetsTable();
      renderChart();
    } catch (error) {
      alert('Error deleting asset: ' + error.message);
    }
  }
}

// Test connection on startup
fetchApi('/test')
  .then(data => console.log('Backend connection:', data.message))
  .catch(err => console.error('Backend connection failed:', err));