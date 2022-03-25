import { Headers } from '../../models/headers.js';

//controller Get headers
export const getHeadersForm = async (req, res) => {
  try {
    const header = await Headers.findAll({
      where: {
        header_add_id: req.params.id,
        header_prod_date: req.params.date,
      },
    });
    res.json(header[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createHeaderForm = async (req, res) => {
  try {
    const dataHead = req.body;
    const findData = await Headers.findOne({
      where: {
        header_prod_date: dataHead.header_prod_date,
        header_dept_id: dataHead.header_dept_id,
        header_add_id: dataHead.header_add_id,
      },
    });

    if (!findData) {
      const newHeader = await Headers.create(req.body);
      return res.json({
        item: newHeader,
        message: 'Header added',
      });
    }

    await Headers.update(dataHead, {
      where: {
        header_id: findData.header_id,
      },
    });
    return res.json({
      message: 'Headers Updated',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// export const updateHeaderForm = async (req, res) => {
//   try {
//     const dataHeader = req.body;
//     await Headers.update(dataHeader, {
//       where: {
//         header_id: req.params.id,
//       },
//     });
//     res.json({
//       message: 'Headers Updated',
//     });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// export const getShiftHeader = async (req, res) => {
//   const shiftHead = await ShiftHeader.findOne({
//     where: {
//       shift_prod_date: req.params.date,
//       shift_user_id: req.params.id,
//     },
//   });
//   res.json(shiftHead);
// };
