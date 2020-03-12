const mockData = {
    'get': {
        '/joho?mode=ALL' : {
            data :[
                {"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"},
                {"id": "2", "name": "サンプル 名前2", "mailAddress": "sample2@example.com", "phoneNo": "09000000002", "torokuNichiji": "2020/01/02 02:00"},
                {"id": "3", "name": "サンプル 名前3", "mailAddress": "sample3@example.com", "phoneNo": "09000000003", "torokuNichiji": "2020/01/03 03:00"},
                {"id": "4", "name": "サンプル 名前4", "mailAddress": "sample4@example.com", "phoneNo": "09000000004", "torokuNichiji": "2020/01/04 04:00"},
                {"id": "5", "name": "サンプル 名前5", "mailAddress": "sample5@example.com", "phoneNo": "09000000005", "torokuNichiji": "2020/01/05 05:00"},
                {"id": "6", "name": "サンプル 名前6", "mailAddress": "sample6@example.com", "phoneNo": "09000000006", "torokuNichiji": "2020/01/06 06:00"},
                {"id": "7", "name": "サンプル 名前7", "mailAddress": "sample7@example.com", "phoneNo": "09000000007", "torokuNichiji": "2020/01/07 07:00"},
                {"id": "8", "name": "サンプル 名前8", "mailAddress": "sample8@example.com", "phoneNo": "09000000008", "torokuNichiji": "2020/01/08 08:00"},
                {"id": "9", "name": "サンプル 名前9", "mailAddress": "sample9@example.com", "phoneNo": "09000000009", "torokuNichiji": "2020/01/09 09:00"},
                {"id": "10", "name": "サンプル 名前10", "mailAddress": "sample10@example.com", "phoneNo": "09000000010", "torokuNichiji": "2020/01/10 10:00"},
                {"id": "11", "name": "サンプル 名前11", "mailAddress": "sample11@example.com", "phoneNo": "09000000011", "torokuNichiji": "2020/01/11 11:00"},
                {"id": "12", "name": "サンプル 名前12", "mailAddress": "sample12@example.com", "phoneNo": "09000000012", "torokuNichiji": "2020/01/12 12:00"},
                {"id": "13", "name": "サンプル 名前13", "mailAddress": "sample13@example.com", "phoneNo": "09000000013", "torokuNichiji": "2020/01/13 13:00"},
                {"id": "14", "name": "サンプル 名前14", "mailAddress": "sample14@example.com", "phoneNo": "09000000014", "torokuNichiji": "2020/01/14 14:00"},
                {"id": "15", "name": "サンプル 名前15", "mailAddress": "sample15@example.com", "phoneNo": "09000000015", "torokuNichiji": "2020/01/15 15:00"},
                {"id": "16", "name": "サンプル 名前16", "mailAddress": "sample16@example.com", "phoneNo": "09000000016", "torokuNichiji": "2020/01/16 16:00"},
                {"id": "17", "name": "サンプル 名前17", "mailAddress": "sample17@example.com", "phoneNo": "09000000017", "torokuNichiji": "2020/01/17 17:00"},
                {"id": "18", "name": "サンプル 名前18", "mailAddress": "sample18@example.com", "phoneNo": "09000000018", "torokuNichiji": "2020/01/18 18:00"},
                {"id": "19", "name": "サンプル 名前19", "mailAddress": "sample19@example.com", "phoneNo": "09000000019", "torokuNichiji": "2020/01/19 19:00"},
                {"id": "20", "name": "サンプル 名前20", "mailAddress": "sample20@example.com", "phoneNo": "09000000020", "torokuNichiji": "2020/01/20 20:00"}
            ]
        },
        '/joho?mode=ALL&name=*' : {
            data : [
                {"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"},
                {"id": "10", "name": "サンプル 名前10", "mailAddress": "sample10@example.com", "phoneNo": "09000000010", "torokuNichiji": "2020/01/10 10:00"}
            ]
        },
        '/joho?mode=SELF' : {
            data : [
                {"id": "3", "name": "サンプル 名前3", "mailAddress": "sample3@example.com", "phoneNo": "09000000003", "torokuNichiji": "2020/01/03 03:00"},
                {"id": "9", "name": "サンプル 名前9", "mailAddress": "sample9@example.com", "phoneNo": "09000000009", "torokuNichiji": "2020/01/09 09:00"},
                {"id": "13", "name": "サンプル 名前13", "mailAddress": "sample13@example.com", "phoneNo": "09000000013", "torokuNichiji": "2020/01/13 13:00"},
                {"id": "19", "name": "サンプル 名前19", "mailAddress": "sample19@example.com", "phoneNo": "09000000019", "torokuNichiji": "2020/01/19 19:00"}
            ]
        },
        '/joho?mode=SELF&name=*' : {
            data : [
                {"id": "3", "name": "サンプル 名前3", "mailAddress": "sample3@example.com", "phoneNo": "09000000003", "torokuNichiji": "2020/01/03 03:00"},
                {"id": "13", "name": "サンプル 名前13", "mailAddress": "sample13@example.com", "phoneNo": "09000000013", "torokuNichiji": "2020/01/13 13:00"}
            ]
        }
    },
    'post': {
        '/joho' : {
            data : {
                "name": "モック 太郎",
                "mailAddress": "mock_taro@example.com",
                "phoneNo": "09000123456",
                "torokuNichiji": "2019/10/09 10:51"
            }
        }
    },
    'delete': {
        '/joho/*' : {
            data : {},
        },
    }
};

export default mockData;