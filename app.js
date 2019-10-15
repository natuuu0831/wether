var app = new Vue({
  el: "#app",
  data: {
    city: "?",
    temp: null,
    maxtemp: null,
    mintemp: null,
    day: null,
    condition: {
      main: "?",
      sub: null
    },
    radioDeta: [
      { value: "札幌", data: "2128295" },
      { value: "仙台", data: "2111149" },
      { value: "東京", data: "1850147" },
      { value: "名古屋", data: "1856057" },
      { value: "大阪", data: "1853909" },
      { value: "福岡", data: "1859307" }
    ],
    color: ""
  },
  methods: {
    getCity: function(event) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?id=${event.target.getAttribute(
            "data"
          )}&units=metric&APPID=bba8e5a1724d6f61fc6bc87a5a82221d`
        )
        .then(function(res) {
          // this.city = res.data.name;
          this.temp = res.data.main.temp;
          this.maxtemp = res.data.main.temp_max;
          this.mintemp = res.data.main.temp_min;
          this.condition.main = res.data.weather[0].main;
        }.bind(this));
    },
    weather: function(color) {
      switch (this.condition.main) {
        case "Clear":
          this.color = "clear";
          this.condition.main = "晴れ";
          break;
        case "Clouds":
          this.color = "clouds";
          this.condition.main = "曇り";
          break;
        case "Rain":
          this.color = "rain";
          this.condition.main = "雨";
          break;
        case "Mist":
          this.color = "mist";
          this.condition.main = "霧";
          break;
        case "Drizzle":
          this.color = "drizzle";
          this.condition.main = "霧雨";
          break;
        default:
          break;
      }
      return color;
    }
  },
  filters: {
    newtemp: function(val) {
      return Math.ceil(val);
    }
  },
  mounted() {
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var day = dt.getDay();
    var hours = dt.getHours();
    var sevenday = ["月", "火", "水", "木", "金", "土", "日"];
    var todayDate = `${month}月${date}日${sevenday[day]}曜日${hours}時現在`;
    return (this.day = todayDate);
  },
  computed: {}
});
