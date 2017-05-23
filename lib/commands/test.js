var channelVids = require('yt-channel-videos')(process.env.YOUTUBE_KEY);
 
channelVids.allUploads('Vsauce')
.then(function(videos) {
  console.log(videos.items[0].id); // { videoCount: X, pageCount: Y, items: [...] } 
});