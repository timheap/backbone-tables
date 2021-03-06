var Class = require('../../lib/class').Class;
var Controller = require('../../lib/controller').Controller;

var Users = Class.extend(Controller, {

	ajax_fetch: function() {
		var ids = this.$req.body;
		var users = this.$models.users.filter(function(user) {
			return ids.indexOf(user.get('id')) !== -1;
		});
		this.$res.writeHead(200, {'Content-type': 'application/json'});
		this.$res.write(JSON.stringify(users));
		this.$res.end();
	},

	ajax_list: function() {
		var page = this.$req.body.page || 0;
		var count = Math.min(100, Math.max(0, Number(this.$req.body.count) || 10));

		var length = this.$models.users.length;
		var start = page * count;
		var end = start + count;
		var users = this.$models.users.slice(start, end);

		var ids = users.map(function(user) {
			return user.get('id');
		});
		var data = {
			length: length,
			pages: Math.ceil(length / count),
			page: page,
			docs: ids,
		};

		this.$res.writeHead(200, {'Content-type': 'application/json'});
		this.$res.write(JSON.stringify(data));
		this.$res.end();
	},

});
module.exports.Users = Users;
