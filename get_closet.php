<?php
//header('Content-Type: application/json');
require_once('twitter_proxy_closet.php');

// Twitter OAuth Config options
// Twitter OAuth Config options
$oauth_access_token = '517801153-GWTN0trhRp6fi52KkK3exDuusb7fXDKSDgJ8YHbc';
$oauth_access_token_secret = 'VujpgwmlujyhuHIz0pyaRBMbvA8LOs99fiJNdphJmWdYG';
$consumer_key = 'c2FpP81DX0tsJEKChYG6fW0yF';
$consumer_secret = 'lZeUUJh1DQtXNu6ZAn45bL3SYdFt4mKJR9VA2ofVTrJhfYYlWI';

if(isset($_GET['lat']))
    {
		$query =(string)$_GET['lat'];
		$lat = ''.urlencode($query);
	}
if(isset($_GET['lng']))
    {
		$query =(string)$_GET['lng'];
		$long = ''.urlencode($query);
	}

//$user_id = '1';
//$id = '1';
//$screen_name = 'ujjwaljoshi93';
//$count = 5;
$twitter_url = 'trends/closest.json';
$twitter_url .= '?lat=' . $lat;
$twitter_url .= '&long=' . $long;

//$twitter_url .= '?id=' . $id;
//$twitter_url .= '?user_id=' . $user_id;
//$twitter_url .= '&screen_name=' . $screen_name;
//$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy_search.php class
$twitter_proxy_closet = new TwitterProxy_search(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$lat,							// Get Latitude
	$long							// Get Longitude
	//$user_id						// User id (http://gettwitterid.com/)
	//$screen_name,					// Twitter handle
	//$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy_closet->get($twitter_url);

//echo $tweets;
echo $tweets;

?>