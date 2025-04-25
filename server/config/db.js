// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);

        
//         console.log("✅ MongoDB Connected");
//     } catch (err) {
//         console.error("❌ MongoDB Error: ", err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: true, // only for development/testing
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error: ', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

