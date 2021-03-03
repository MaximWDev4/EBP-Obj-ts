import * as SQLite from 'expo-sqlite';
import * as FileSystem from "expo-file-system";

export interface Props {
	db: any
}
export default class DB {
	db: any;
	constructor() {

		const name = 'ebp';
		this.db = SQLite.openDatabase(name);

		//db.transaction(tx => {
		this.db.transaction((tx: any) => {
			tx.executeSql(
				//'create table if not exists account (id integer primary key not null, name text, balance int);',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
				//'create table if not exists data (id integer primary key not null, text text);',
				//'create table if not exists data (id INTEGER PRIMARY KEY AUTOINCREMENT, text text);',
				//'drop table record',
				//'create table if not exists data (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, sid INTEGER);',
				//'create table if not exists record (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, sid INTEGER, dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
				'create table if not exists record (id INTEGER PRIMARY KEY AUTOINCREMENT, type Text, data TEXT, sid INTEGER, img_old TEXT, img_new TEXT, dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
				[],
				//()=>console.log("creeeated!!!!!!!!!!!!!"),
				//(a,b)=>console.log(b)


				);
		});

	}




    add = (type: 'obj' | 'znak', text: string, img_old?: string[] | string, img_new?: string[] | string) => {
		img_old = JSON.stringify(img_old);
		img_new = JSON.stringify(img_new);
	  	this.db.transaction( (tx: any) => {
			  tx.executeSql("insert into record (type, data, img_old, img_new) values (?, ?, ?, ?)", [type, text, img_old, img_new],
				  // @ts-ignore
				  (tx, res) => {
					let id = res.insertId;
				}
				);
	  },
	  (e: any) => {
		  alert(e + 'DB')
	  }


	  );
  }




  //del = () => {

	  //db = this.db;

	  //db.transaction( tx => {

		  //tx.executeSql("select * from data", [], (_, { rows }) => {

			  //let arr = rows._array;
			  //let len = rows.length;

			  //console.log(JSON.stringify(arr));

			  //let item=null;
			  //if (len) {
				  //item = arr[0];
			  //};


			  //if (item) {
				  //tx.executeSql("delete from data where id = ?;", [item.id]);
			  //};

		  //});





	  //},
		  //null,
		  //null,
		  //);
  //}



  //getItem = () => {
  getItem = (callback: any) => {
  //getItem = async() => {
	  let db = this.db;

	  let item: any = null;


	  //return await 666;
	  //return 777;

	  //db.transaction( tx => {
	  //await db.transaction( tx => {
	  db.transaction( (tx: any) => {
	  //db.transaction( async tx => {
	  //await db.transaction( async tx => {
	  //await db.transaction( tx => {
	  //await db.transaction( (tx) => {
		  //tx.executeSql("select * from data", [], (_, { rows }) => {
		  //tx.executeSql("select * from data", [], async(_, { rows }) => {
		   //tx.executeSql("select * from data", [], (_, { rows }) => {
		   //async tx.executeSql("select * from data", [], (_, { rows }) => {

		  //return new Promise(()=>{


		  //});
		  //return 888;
		  //return await 666;
		  //tx.executeSql("select * from data", [], async (_, { rows }) => {
		  //tx.executeSql("select * from data", [], (_, { rows }) => {
		  // @ts-ignore
		  tx.executeSql("select * from record", [], (_, { rows }) => {

			  let arr = rows._array;
			  let len = rows.length;

			  console.log(JSON.stringify(arr));

			  if (len) {
				  item = arr[0];
				  //await item = arr[0];
			  }
			  //return await item;
			  //return item;
			  //console.log(444);
			  //console.log(item);

			  callback(item);

			  //return new Promise(()=>{
				  //alert(666)
			  //});

		  },


		  null,
		  null,
		  );
		  //return await item;
	  });

	  //console.log(333);
	  //console.log(item);
	  //return item;
  }







	  //update = (item) => {
	  update = (item: any, callback: any) => {

		  this.getItem((item: any)=>{

			  this.db.transaction( (tx: any) => {
				  //tx.executeSql("UPDATE data SET sid = 555 where id = ?;", [item.id]);
				  tx.executeSql("UPDATE record SET sid = 1 where id = ?;", [item.id]);


				  callback();
			  },


			  null,
			  null,
			  );
		  });

	  }


	  del(id: number){
			  this.db.transaction( (tx: any) => {
				  tx.executeSql("delete from record where id = ?;", [id]);
			  },
			  null,
			  null,
			  );

	  }





  getCount(callback: any) {
	  let db = this.db;

	  let item=null;


	  db.transaction( (tx: any) => {
		  //tx.executeSql("select count(*) AS c from data", [], (_, { rows }) => {
		  // @ts-ignore
		  tx.executeSql("select count(*) AS c from record", [], (_, { rows }) => {

			  let arr = rows._array;
			  let len = rows.length;

			  let c:number = 0;
			  if (len) {
				  item = arr[0];
				  c = item.c;
			  }

			  callback(c);
		  },

		  0,
		  null,
		  );
	  });
  }






  getZnaki(callback: any){

	  let item=null;

	  this.db.transaction( (tx: any) => {
	  //db.transaction( async tx => {
	  //await db.transaction( async tx => {
	  //await db.transaction( tx => {
	  //await db.transaction( (tx) => {
		  //tx.executeSql("select * from data", [], (_, { rows }) => {
		  //tx.executeSql("select * from data", [], async(_, { rows }) => {
		   //tx.executeSql("select * from data", [], (_, { rows }) => {
		   //async tx.executeSql("select * from data", [], (_, { rows }) => {

		  //return new Promise(()=>{


		  //});
		  //return 888;
		  //return await 666;
		  //tx.executeSql("select * from data", [], async (_, { rows }) => {
		  //tx.executeSql("select * from data", [], (_, { rows }) => {
		  // @ts-ignore
		  tx.executeSql("select * from record", [], (_, { rows }) => {

			  let arr = rows._array;
			  //let len = rows.length;

			  // console.log(JSON.stringify(arr));

			  //if (len) {
				  //item = arr[0];
				  ////await item = arr[0];
			  //};
			  //return await item;
			  //return item;
			  //console.log(444);
			  //console.log(item);

			  callback(arr);

			  //return new Promise(()=>{
				  //alert(666)
			  //});

		  },


		  null,
		  null,
		  );
	  });
	}

	  ////updateZnak = (item, callback) => {
	  //updateZnak = (item, key, value, callback) => {

		  //this.getItem((item)=>{

			  //this.db.transaction( tx => {
				  ////tx.executeSql("UPDATE data SET sid = 555 where id = ?;", [item.id]);
				  ////tx.executeSql("UPDATE record SET sid = 1 where id = ?;", [item.id]);
				  ////tx.executeSql("UPDATE record SET ? = ? where id = ?;", [ key, value, item.id]);
				  ////tx.executeSql("UPDATE record SET ? = ? where id = ?;", [ key, value, item.id],
				  ////tx.executeSql("UPDATE record SET sid = ? where id = ?;", [ key, value, item.id],
				  ////tx.executeSql("UPDATE record SET sid = ? where id = ?;", [ value, item.id],
				  ////tx.executeSql("UPDATE record SET ${key} = ? where id = ?;", [ value, item.id],
				  //tx.executeSql(`UPDATE record SET ${key} = ? where id = ?;`, [ value, item.id],
					  //(e) => {},
					  //(tx, e) => {
						  //alert(e);
					  //},

					  //);

				  //callback();
			  //},


			  //null,
			  //null,
			  //);
		  //});

	  //}

	  //updateZnak = (item, key, value, callback) => {
	  updateZnak(item: any, key: string, value: any, callback: any) {

					  //callback(p);
					  //callback(value);
					  //return;
		  this.db.transaction( (tx: any) => {

			  tx.executeSql(`UPDATE record SET ${key} = ? where id = ?;`, [ value, item.id ],
				  //callback,
				  // @ts-ignore
				  (tx, e) => {
					  //alert(e);
					  callback(value);
				  },
				  // @ts-ignore
				  (tx, e) => { alert(e); callback(e); return},

				  );
		  });

	  }

	  deleteZnak =  (item: any, callback: any) => {
		let imgs_old: string[] = JSON.parse(item.img_old);
		let imgs_new: string[] = JSON.parse(item.img_new);
		if (!!imgs_old) {
			imgs_old.map(async (img_old: string) => {
				let fileExists = (await FileSystem.getInfoAsync(img_old)).exists;
				if (fileExists) {
					await FileSystem.deleteAsync(img_old);
				}
			})
		}
		if (!!imgs_new) {
			imgs_new.map(async (img_new) => {
				let fileExists2 = (await FileSystem.getInfoAsync(img_new)).exists;

				if (fileExists2) {
					await FileSystem.deleteAsync(img_new);
				}
			})
		}
		  this.db.transaction( (tx: any) => {
			  tx.executeSql("delete from record where id = ?;", [item.id]);
		  });
		  //callback();
	  }


}

