const expess = require('express');
const cors = require('cors');
const path = require('path');
const companyRoutes = require("./routes/CompanyRoute");
const contactRoutes = require("./routes/ContactRoute");
const FAQRoutes = require("./routes/FaqRoute");
const loginRoutes = require("./routes/LoginRoute");
const sliderRoutes = require("./routes/SliderRoute");
const ServiceRoutes = require("./routes/ServiceRoute");
const GalleryRoutes = require("./routes/GalleryRoute");


require("./db/dbConnection")
const dotenv = require('dotenv');
const app = expess();

dotenv.config({quiet: true});

app.use(cors());
app.use(expess.json());
app.use("/public", expess.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(companyRoutes);
app.use(contactRoutes);
app.use(FAQRoutes);
app.use(loginRoutes);
app.use(sliderRoutes);
app.use(ServiceRoutes);
app.use(GalleryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
