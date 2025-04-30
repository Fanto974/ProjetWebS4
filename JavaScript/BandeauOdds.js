var dataSource = "../JavaScript/Bandeau.json";
var options = {
    timenav_position: 'bottom',
    initial_zoom: 2,
    start_at_end: false
};
new TL.Timeline('timeline-embed', dataSource, options);