const db = require('../models');
const Asset = db.assets;

exports.findAllForUser = async (req, res) => {
  try {
    const assets = await Asset.findAll({ 
      where: { userId: req.params.userId }
    });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Asset.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAsset = await Asset.findByPk(req.params.id);
      res.json(updatedAsset);
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Asset.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Asset deleted successfully' });
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};