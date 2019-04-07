var tweetCounter = document.getElementById("tweet-counter");
var tweetCount = 0;

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-84.063085, 39.780713]),
      zoom: 10
    })
  });
  /*var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([-74.006,40.7127])
    ),  // Cordinates of New York's Town Hall
  });*/
  var vectorSource = new ol.source.Vector({
    features: []
  });
  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  map.addLayer(markerVectorLayer);

var socket = io();
socket.on("new precise tweet", function(msg) {
    //console.log(msg.data);
    console.log("New tweet from: long: " + msg.data[0] + " lat: " + msg.data[1]);
    var marker2 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([msg.data[0], msg.data[1]])
        ),
    });
    marker2.set("url", msg.url);
    marker2.setStyle(new ol.style.Style({
      image: new ol.style.Icon(({
          crossOrigin: 'anonymous',
          src: 'images/PingTwitter.png',
          scale: 0.1
      }))
    }));
    vectorSource.addFeature(marker2);
    tweetCount++;
    tweetCounter.innerText = "Tweets: " + tweetCount;
    addNewTweetToList(msg.avatar, msg.profileName, msg.tweetContent);
});

socket.on("new loose tweet", function(msg) {
    //console.log(msg.data);
    console.log("New tweet within area sw-long: " + msg.data[0][0][0] + " sw-lat: " + msg.data[0][0][1] + " ne-long: " + msg.data[0][1][0] + " ne-lat: " + msg.data[0][1][1]);
    let geodata = [randomDoubleInRange(msg.data[0][0][0], msg.data[0][1][0]), randomDoubleInRange(msg.data[0][0][1], msg.data[0][1][1])];
    console.log("Area midpoint: long: " + geodata[0] + " lat: " + geodata[1]);
    console.log(msg.url);
    var marker2 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([geodata[0], geodata[1]])
        ),
    });
    marker2.set("url", msg.url);
    marker2.setStyle(new ol.style.Style({
      image: new ol.style.Icon(({
          crossOrigin: 'anonymous',
          src: 'images/PingTwitter2.png',
          scale: 0.1
      }))
    }));
    vectorSource.addFeature(marker2);
    tweetCount++;
    tweetCounter.innerText = "Tweets: " + tweetCount;
    addNewTweetToList(msg.avatar, msg.profileName, msg.tweetContent);
});

function randomDoubleInRange(min, max) {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}

map.on("click", function(e) {
  map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      var win = window.open(feature.get("url"), '_blank');
      win.focus();
  })
});

var shown = false;
document.addEventListener('visibilitychange' , function() {
  if (document.hidden) {
    if (!shown)
    {
      alert("Tweets only register while the window is in focus");
      shown = true;
    }
  }
}, false);

function changeMapKey()
{
  let key = document.getElementById("map-key-content");
  if (key.style.display == "none")
  {
    key.style.display = "block";
  } else {
    key.style.display = "none";
  }
}

var tweetNumber = 1;
function addNewTweetToList(avatar_url, username, text, tweet_url)
{
  let tweet = document.createElement("a");
  tweet.classList.add("tweet");
  if (tweet_url != null)
  {
    tweet.href = tweet_url;
    tweet.target = "_blank";
  } else {
    tweet.href = "#";
  }
  let avatar = document.createElement("img");
  if (avatar_url != null)
  {
    avatar.src = avatar_url;
  } else {
    avatar.src = "images/default-avatar.jpg";
  }
  avatar.classList.add("tweet-avatar");
  tweet.appendChild(avatar);
  let subtweet = document.createElement("div");
  subtweet.classList.add("subtweet");
  tweet.appendChild(subtweet);
  let tweetHeader = document.createElement("div");
  tweetHeader.classList.add("tweet-header");
  subtweet.appendChild(tweetHeader);
  let tweetNum = document.createElement("h1");
  tweetNum.classList.add("tweet-num");
  tweetNum.innerText = "#" + tweetNumber;
  tweetHeader.appendChild(tweetNum);
  let tweetUser = document.createElement("h1");
  tweetUser.classList.add("tweet-user");
  if (username != null)
  {
    tweetUser.innerText = username;
  } else {
    tweetUser.innerText = "Error retrieving username";
  }
  tweetHeader.appendChild(tweetUser);
  let tweetText = document.createElement("p");
  tweetText.classList.add("tweet-text");
  if (text != null) {
    tweetText.innerText = text;
  } else {
    tweetText.innerText = "Error retrieving tweet content";
  }
  subtweet.appendChild(tweetText);
  
  document.getElementById("tweets-container").appendChild(tweet);

  tweetNumber++;
}