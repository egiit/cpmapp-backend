import { QueryGetForm } from '../../models/standarForm.js';

// Ambil Form
export const getForm = async (req, res) => {
  const formStd = await QueryGetForm.findAll({
    where: { standar_from_divi: req.params.dept },
    order: [['standar_form_order', 'ASC']],
  });
  res.json(formStd);
};
