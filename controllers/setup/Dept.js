import Dept from '../../models/dept.js';

const getDept = async (req, res) => {
  const depts = await Dept.findAll();
  res.json(depts);
};

export default getDept;
