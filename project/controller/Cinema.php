<?php

$postcode = $_POST['postcode'];
$address = urlencode($postcode);
$key = "AIzaSyBTPTNXIrRBur4aVF1fJCQYU-2AIltLAGU";
$url = "https://maps.google.com/maps/api/geocode/json?key=$key&address={$address}";
$resp_json = file_get_contents($url);
$resp = json_decode($resp_json, true);

if($resp['status'] != 'OK') {
    $result = ['status' => 'wrong'];
    echo(json_encode($result, true));
    die();
}

include('DB.php');
date_default_timezone_set("Europe/London");
    
$db = new DB();


$now = date('Y-m-d h:i:s');  
$sql = "SELECT c.* FROM nlcwV2_cinema_address c
        JOIN nlcwV2_seat_detail as s ON s.location_id=c.id
        WHERE DATE_SUB(CONCAT(s.unique_date,' ',s.scr_time), INTERVAL closing_time HOUR)>'$now'
        GROUP BY c.id asc";



$result = $db->sqlRun($sql);


if($result->num_rows == 0) return '0';
$arr_dist = [];
while($row = $result->fetch_assoc()) {
    if($row['scr_24'] == null || $row['scr_25'] == null ) continue;
    $item = [
                'id'=> $row['id'],
                'cinema'=> $row['cinema'], 
                'postcode'=> $row['post_code'], 
                'address1'=> $row['address1'], 
                'address2'=> $row['address2'], 
                'city'=> $row['city'], 
                'lat' =>  $row['scr_24'], 
                'lng' =>  $row['scr_25']
            ];
    array_push($arr_dist, $item);
}

$lat = $resp['results'][0]['geometry']['location']['lat'];
$lng = $resp['results'][0]['geometry']['location']['lng'];


foreach ($arr_dist as $key => $item) {
    $d = getDistanceFromLatLonInKm($lat, $lng, $item['lat'],$item['lng'] );
    $arr_dist[$key]['distance'] = $d;
    
}
    
usort($arr_dist, function($a, $b){
    return $a['distance'] <=> $b['distance'];
});
$arr_dist = array_slice($arr_dist, 0, 10);


foreach ($arr_dist as $key => $item) {
    $sql = "SELECT s.* FROM nlcwV2_seat_detail s
            JOIN  nlcwV2_cinema_address as c ON s.location_id=c.id
            WHERE c.post_code = '".$item['postcode']."' AND DATE_SUB(CONCAT(s.unique_date,' ',s.scr_time), INTERVAL closing_time HOUR)>'$now'
            ";
    // echo($sql);die();
    $result = $db->sqlRun($sql);
    $seat_details = [];
    while($row = $result->fetch_assoc()) {
    $e = [
            'id'=> $row['id'],
            'location_name'=> $row['location_name'],
            'seat'=> $row['seat'],
            'unique_time'=> $row['unique_time'],
            'scr_time'=> $row['scr_time'],
            'closing_time'=> $row['closing_time'],
            'waiting_close'=> $row['waiting_close'],
        ];
    array_push($seat_details, $e);
    }
    $arr_dist[$key]['seat_details'] = $seat_details;
}


$result = ['status' => 'OK', 'data' => $arr_dist];
echo(json_encode($result, true));
?>