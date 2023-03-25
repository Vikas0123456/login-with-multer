const express = require('express');
const tableRoutes = require('./routes/routes');
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const port = 8989;

app.listen(port, (err) => {
	if (err) {
		console.log(err.sqlMessage);
	} else {
		console.log(`server started on port ${port}`);
	}
});
app.use('/', tableRoutes);
