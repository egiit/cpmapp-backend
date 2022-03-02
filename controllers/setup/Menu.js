import Menus from '../../models/menus.js';

const getMenu = async (req, res) => {
  const menus = await Menus.findAll();
  res.json(menus);
};

export default getMenu;
