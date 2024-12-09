const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic05PeGx5dVh5bDAySGoyekhOSmNHT0NNOTVOYlB0Z2tMQlR2S0hIeXlGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzVhOGlrVzVKN2EzaHU3ZWJkVklDR1RRM1BhVldyck56RXVPR2RQWmFpcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQ2w4K3dmNmVpZEhodVllUVloT2VZV2xtdTlWQTMzaUFUYmxjdnVSODNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2ZVg5SkRPcVVPN2p4anA2TjBXVUtmMjN1RVR5dW5JUU43cXNpczhZaUhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FSjFHVXdPVWlTRE1OZnh3QkNXUHU1MmF1T29KQ3FFRmFsdFZIR2xXMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktwNUc5OFFYSk9SOVJIVEhaNmc4WWkrZzhTdHhZc2JiNGtjV2g2RVl4MlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUVBQ2ozVHlZWFp3aDNiMzBBT2M3NnRtY3lrcFY2Tm1xL0FCOUtzTlBYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1ArOWQrcTNyOUVGSGxLeE9vQStOMzNkbzV3M2pHQzZneldoa1p6TjZ6TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlZQWVUYnVkQ0NJNnBPYmt0eURiQXQ5SDJpUU9SM0g4elBRdEdEY2piQnI3Q1RucmhGTjRDM0I1MWlROXpBa0VXUkpQdDNVYzQ2eDM4RHdSREx2WGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6InhLZlhqTlE0N3h4UG5iZGwzNXFEOUcrYlVPdzk3L0dVdkJJdWduMDRhQ2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBmWWgwRlBhU1lHOUZ0VDgxT0pGYlEiLCJwaG9uZUlkIjoiNmNmN2IyYTItZDliYy00MzNkLWEyZGYtMThjMWIyMTMxNWMxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1WbWFuc1FOelBSMEs5Z1FXa0YzM0V0akZVUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5MTJyOE9EVkorUUduMnQ5L2xEU21MdlY3THM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlg2Qkc2TEQiLCJtZSI6eyJpZCI6IjI1NDc1NTQ2ODc0ODoxNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBcnRlbWlzIEZvd2wifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1Ayd2xKQUZFT2F5MmJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkVaemVCdGxNcGhZWUxLTWpUaGNYMjFPZHBEWjdNVDJydnBDNjF3aDUwZ0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkUzdXFKNElZY3Y1OWdheFpJNDY3SEhBT01rREFtY3hHOGNUUE9zbTc5Z2xhd2xwVmIrYVh2T3hUWEp3c2N3QXp0ZTNOWHM1MStMNGlxNEtkUTBaVkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJEYmcxOUFtT3ZhcDZaYmo5a2ZrME1jQkVDeVRiTWdWM2FhZGVSa1NwUCtDUUFvTTRmMkp6UE5ZQjYvbk0yb1lqa0tWQk9mNUhVNWgzaXdmUHNMRk5odz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1NTQ2ODc0ODoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSR2MzZ2JaVEtZV0dDeWpJMDRYRjl0VG5hUTJlekU5cTc2UXV0Y0llZElCIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNzEyMjQzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFwaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Artemis fowl",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
