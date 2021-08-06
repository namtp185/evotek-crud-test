require('dotenv').config()
const dbUsername = process.env.DB_USERNAME || "new-user-32";
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.ublvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// moongose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
	try {
		await require("mongoose").connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;