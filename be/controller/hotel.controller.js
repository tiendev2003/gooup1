import Hotel from '../model/hotel.model.js'
export default class HotelController {
  static create(req, res) {
    const { name, price } = req.body

    if (!name || !price) {
      res.status(400).send({
        message: 'Tên và giá không được rỗng!',   error: true,
      })
      return
    }

    Hotel.create(req.body, (err, hotel) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Lỗi hệ thống',   error: true,
        })
      } else
        res.status(201).json({
          message: 'Tạo Hotel thành công!',
          data: hotel,
          error: false,
        })
    })
  }

  static findAll(_, res) {
    Hotel.getAll((err, hotels) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Lỗi hệ thống',   error: true,
        })
      } else
        res.status(200).json({
          message: 'Danh sách các Hotel!',
          data: hotels,
          error: false,
        })
    })
  }

  static update(req, res) {
    const { name, price } = req.body

    if (!name || !price) {
      res.status(400).send({
        message: 'Nhom và giá không được rỗng!',   error: true,
      })
      return
    }
    Hotel.updateById(req.params.id, new Hotel(req.body), (err, hotel) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy id ${req.params.id}.`,   error: true,
          })
        } else {
          res.status(500).send({
            message: 'Lỗi khi cập nhật id ' + req.params.id,   error: true,
          })
        }
      } else
        res.status(200).json({
          message: 'Đã cập nhật Hotel thành công!',
          data: hotel,
          error: false,
        })
    })
  }

  static delete(req, res) {
    if (!req.params.id) {
      res.status(400).send({
        message: 'Id không được rỗng!',
        error: true,
      })
      return
    }
    Hotel.remove(req.params.id, (err) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tim thấy id ${req.params.id}.`,
            error: true,
          })
        } else {
          res.status(500).send({
            message: 'Không thể xóa id ' + req.params.id,
            error: true,
          })
        }
      } else
        res.status(200).json({
          message: 'Đã xóa Hotel thành công!',
          data: '',
          error: false,
        })
    })
  }

  static deleteAll(req, res) {
    Hotel.removeAll((err) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Lỗi hệ thống',   error: true,
        })
      } else
        res
          .status(200)
          .json({ message: 'Tất cả Hotel đã được xóa', data: '', error: false })
    })
  }

  static findOne(req, res) {
    if (!req.params.id) {
      res.status(400).send({
        message: 'Id không được rỗng!',   error: true,
      })
      return
    }
    Hotel.findById(req.params.id, (err, hotel) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy id  ${req.params.id}.`,   error: true,
          })
        } else {
          res.status(500).send({
            message: 'Lỗi khi xóa id ' + req.params.id,   error: true,
          })
        }
      } else
        res
          .status(200)
          .json({ message: 'Danh sách Hotel theo id', data: hotel, error: false })
    })
  }
}
