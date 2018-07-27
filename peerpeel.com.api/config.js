module.exports = {
  database: {
    client: "mysql",
    connection: {
      port: 3306,
      host: "127.0.0.1",
      database: "peerpeel",
      user: "root",
      password: "sql",
      chartset: "utf8"
    }
  },
  "Server":{
    "port": 8080,
    "host": "0.0.0.0",
    "jwtSecret": "bzenFbuwQrrzNS/xNapxOObxl3WgAS58irjjdXz46Nh8vHeeVx7DUkG4pnlhkNG/ePdu9Yki39QQDbmPz9l3KGHVO1UoZDY2ScmRVjX1Khpotsy9zl0ce5T9mp4MYNcS30CiRVSk1QsrP943xrONTQosv5TKKpoHgROX1WAKm16c3glodcYpGgS1f2hZsCZymr7IYYKUFxBFDacShEtZHqSX647yCGwO3Ke8L8fw+VCWLvHSB4ltyRMvizkkIqBZipetUy6XznmimYLXvkRUNgA62lxeH+W2DtQcx2bDwqLwVVIa3FiyrbFB/L5B3tPMHZ7rB5QHyhr5oO/T/cERrg==Qp4S4$4p4",
    "jwtExpiration" : "60m"
}
}