import CryptoJS from 'crypto-js';
import $ from 'jquery';

export const getWeather = (city, callback) => {
  const url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
  const method = 'GET';
  const app_id = '5ciAR1fb';
  const consumer_key =
    'dj0yJmk9aE9LRzNFYTFLM3RLJmQ9WVdrOU5XTnBRVkl4Wm1JbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTcw';
  const consumer_secret = 'e3a3ca9b3a53ac85852de071226d6606b5dc0ef1';
  const concat = '&';
  const query = { location: city, format: 'json' };
  const oauth = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
    oauth_version: '1.0',
  };

  const merged = {};
  $.extend(merged, query, oauth);
  // Note the sorting here is required
  const merged_arr = Object.keys(merged)
    .sort()
    .map(function (k) {
      return [k + '=' + encodeURIComponent(merged[k])];
    });
  const signature_base_str =
    method +
    concat +
    encodeURIComponent(url) +
    concat +
    encodeURIComponent(merged_arr.join(concat));

  const composite_key = encodeURIComponent(consumer_secret) + concat;
  const hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
  const signature = hash.toString(CryptoJS.enc.Base64);

  oauth['oauth_signature'] = signature;
  const auth_header =
    'OAuth ' +
    Object.keys(oauth)
      .map(function (k) {
        return [k + '="' + oauth[k] + '"'];
      })
      .join(',');

  $.ajax({
    url: url + '?' + $.param(query),
    headers: {
      Authorization: auth_header,
      'X-Yahoo-App-Id': app_id,
    },
    method: 'GET',
    success: data => {
      callback(data);
    },
  });
};
