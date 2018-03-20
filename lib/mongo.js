const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb);

const moment = require('moment')
const objectIdTimestamp = require('objectid-to-timestamp')

// Schema
exports.User = mongolass.model('User', {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
    bio: { type: 'string', required: true }
})

// 根据id生成时间戳
mongolass.plugin('addCreatedAt', {
    afterFind: function(results) {
        results.forEach(function(item){
            item.created_at = moment(objectIdTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
        return results
    },

    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})

exports.User.index({name: 1}, {unique: true}).exec() // 根据用户名找到用户，用户名全局唯一



// 文章模型设计
exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId, required: true },
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
  pv: { type: 'number', default: 0 }
})

exports.Post.index({author: 1, _id: -1}).exec()


