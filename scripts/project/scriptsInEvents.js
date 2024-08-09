const pulicKey = "MIGJAoGBALLz87NCEPADrLFxwz6i6P6V9i73+hBEjHuDAuMQuzEVjK/vULzZevoBaPVPPWa3gDqyun2ERA5E2dx7TIMsOHFxHo+ZEHPSy4Xi8uExZzibMVMDOHHLBEyl7fTEK5hY8MDGAS1Dgp+K4toRDR65cTYSMkeuRvjsQdH7Ursf+goNAgMBAAE="

async function clickConnectTon(runtime) {
	const tgData = window?.Telegram?.WebApp?.initData || null
	const request = globalThis.axiosRequest;
	const loading = runtime.getInstanceByUid(128)
	console.log(globalThis.tonUI);
	globalThis?.tonUI?.disconnect?.()
	loading.isVisible = true;
	try {
		 	const { data } =	await request.get("/login/nonce", { headers: {
 					//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b"
	"x-telegram": tgData,
	}})
	const { nonce } = data;
	if (nonce) {
        globalThis.tonUI.setConnectRequestParameters({
          state: 'ready',
          value: {
            tonProof: nonce,
          },
        });
      }
	loading.isVisible = false;
	await globalThis.tonUI.openModal()
	} catch (e) {
		loading.isVisible = false;
	}

}

const getRankItemHtml = (img,index,name, score, uid, isCurrent) => {
	if (img) {
		return `<div class="scroll-item ${isCurrent ? "my-rank" : ""}">
        <img src="${img}" alt="" />
         <div class="scroll-item-name">${name}</div>
        <div class="scroll-item-score">${score}</div>
      </div>`
	} else {
	return `<div class="scroll-item ${isCurrent ? "my-rank" : ""}">
        <div>${index + 1}</div>
                 <div class="scroll-item-name">${name}</div>
        <div class="scroll-item-score">${score}</div>
      </div>`
	}
}

async function getRankList(runtime, type) {
	const tgData = window.Telegram.WebApp.initData
	const token = localStorage.getItem("token");
	const request = globalThis.axiosRequest;

	 	const {data} = await request.get("/statisticians/jumpheight", {
		headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b"
			"x-telegram": tgData,
		},
		params: {
			pageSize: "20"
		}
	});

	const html = runtime.getInstanceByUid(124)
	let htmlContent = `<div class="scroll">`
	let rankData;
	if (type === "all") {
		rankData = data.totalData;
	}
	if (type ==="week") {
		rankData = data.weeklyData
	}
	if (type ==="day") {
		rankData = data.dailyData
	}
	console.log(rankData)
	rankData.forEach((item, index) => {
		const isCurrent = runtime.globalVars.uid === item.uid 
		if (index === 0) {
			htmlContent += getRankItemHtml("./icons/chaimpion.png", index, item.username, item.value, isCurrent)
		}
		
		if (index === 1) {
			htmlContent += getRankItemHtml("./icons/second.png", index, item.username, item.value,isCurrent)
		}
		
		if (index === 2) {
			htmlContent += getRankItemHtml("./icons/third.png", index, item.username, item.value,isCurrent)
		}
		if (index >= 3) {
			htmlContent += getRankItemHtml("", index, item.username, item.value,isCurrent)
		}
	})
	htmlContent += `</div>`
	html.setContent(htmlContent);
	html.isVisible = true
}

async function uploadHighScroe(runtime) {
	const tgData = window.Telegram.WebApp.initData
	const token = localStorage.getItem("token");
	const request = globalThis.axiosRequest;
	console.log(window.JSEncrypt)
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(pulicKey);
 	const { data } = await request.post("/game-score/me", {
		gameScore: encrypt.encrypt(Math.abs(runtime.globalVars.score)?.toString?.() || "0") ,	
  		jumpHeight: encrypt.encrypt(runtime?.globalVars.miles <= 0 ? "0" : runtime?.globalVars.miles.toString()) ,
	}, {
		headers: {
			"Authorization": token,
			"x-telegram": tgData,
			 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
		}
	});
}


function cleanCash(runtime) {

	globalThis?.tonUI?.disconnect?.()
}


async function getBalance(runtime) {
	const token = localStorage.getItem("token");
	const tgData = window.Telegram.WebApp.initData;
	const request = globalThis.axiosRequest;
	if (token) {
			const { data } = await request.get("/user/me", {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
 			"x-telegram": tgData,
			}
		});
		runtime.globalVars.token = data.gameScore;
}
}
// 商品购买
async function buyCommodity(runtime, productId) {
	const token = localStorage.getItem("token");
	const tgData = window.Telegram.WebApp.initData;
	const request = globalThis.axiosRequest;
	if (token) {
			const { data } = await request.post("/product/purchase",{ productId, nums: 1 }, {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
 			"x-telegram": tgData,
			}
		});

		if (data.message === 'success') {
			getBalance();
			getMeInfo(runtime);
		}
		
}
}

async function getProductList(runtime) {
const token = localStorage.getItem("token");
	const tgData = window.Telegram.WebApp.initData;
	const request = globalThis.axiosRequest;
	if (token) {
			const { data } = await request.get("/product/list", {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-			hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
			"x-telegram": tgData,
			}
		});
}
}



async function inviteUser(runtime) {
const token = localStorage.getItem("token");
  const request = globalThis.axiosRequest;
  	const bg = runtime.getInstanceByUid(126)
	const button = runtime.getInstanceByUid(125)
	const text = runtime.getInstanceByUid(127)
	   const tgData = window.Telegram.WebApp.initData;
	const invitationCode = runtime.getInstanceByUid(120).text;
  try {
  	  const { data, ...props } = await request.post("/invite/code/confirm", { shortCode: invitationCode }, {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-			hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
			 "x-telegram": tgData,
			}
		});
	text.text = "invite success!"
  } catch(e) {
  console.log(e)
	text.text = "Invalid invitation code"
	

  }
  setTimeout(() => {
		text.isVisible = true;
		button.isVisible = true
		bg.isVisible = true;
	}, 0)
}

// 签到
async function checkIn(runtime) {
	const token = localStorage.getItem("token");
   const request = globalThis.axiosRequest;
   const tgData = window.Telegram.WebApp.initData;
    const { data } = await request.post("/user/signin",  {}, {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-			hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
			"x-telegram": tgData,
			}
		});
		if (data.message === "success") {
			runtime.globalVars.DailyCheckIn++;
		}
}

async function getInviteInfo(runtime) {
	const token = localStorage.getItem("token");
	const tgData = window.Telegram.WebApp.initData;
	const request = globalThis.axiosRequest;
	if (token) {
			const { data } = await request.get("/invite/me", {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-		hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
			"x-telegram": tgData,
			}
		});
		const reg = /\$\{([^}]+)\}/g;
		const template = runtime.getInstanceByUid(145).text
		const matchRes = template.match(reg);
		console.log(matchRes)
		const fields = matchRes.map(item => {
			const data = item.replace('${', '').replace('}', '')
			return data;
		});
		console.log(fields)
		let textRes = template
		fields.forEach((item) => textRes = textRes.replace("${"+item+"}", String(data[item])))
		console.log(textRes)
		runtime.getInstanceByUid(145).text = textRes;
		runtime.getInstanceByUid(145).isVisible = true;
}
}


const scriptsInEvents = {

	async StartEvent_Event1_Act1(runtime, localVars)
	{
		globalThis.getMeInfo(runtime)
	},

	async StartEvent_Event2_Act4(runtime, localVars)
	{
		
	},

	async FinishEvent_Event1_Act3(runtime, localVars)
	{
		uploadHighScroe(runtime)
	},

	async RankingEvent_Event1_Act1(runtime, localVars)
	{
		getRankList(runtime, 'all')
	},

	async RankingEvent_Event1_Act3(runtime, localVars)
	{
		
	},

	async RankingEvent_Event5_Act1(runtime, localVars)
	{
		getRankList(runtime, 'day')
	},

	async RankingEvent_Event6_Act1(runtime, localVars)
	{
		getRankList(runtime, 'week')
	},

	async RankingEvent_Event7_Act1(runtime, localVars)
	{
		getRankList(runtime, 'all')
	},

	async PropsEvent_Event14_Act1(runtime, localVars)
	{
		globalThis.getMeInfo(runtime)
	},

	async ShopEvent_Event1_Act1(runtime, localVars)
	{
		getProductList(runtime)
	},

	async ShopEvent_Event9_Act1(runtime, localVars)
	{
		buyCommodity(runtime, 1)
	},

	async ShopEvent_Event10_Act1(runtime, localVars)
	{
		buyCommodity(runtime, 6)
	},

	async ShopEvent_Event11_Act1(runtime, localVars)
	{
		buyCommodity(runtime, 2)
	},

	async ShopEvent_Event12_Act1(runtime, localVars)
	{
		buyCommodity(runtime, 5)
	},

	async ShopEvent_Event13_Act1(runtime, localVars)
	{
		buyCommodity(runtime, 3)
	},

	async RoleEvent_Event2_Act1(runtime, localVars)
	{
		cleanCash(runtime)
	},

	async RoleEvent_Event11_Act1(runtime, localVars)
	{
	const token = localStorage.getItem("token");
		const tgData = window?.Telegram?.WebApp?.initData;
		//const tgData = "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b"
		if (tgData) {
			let tgInfo = decodeURIComponent(tgData);
        	if (tgInfo.includes("query_id")) {
          		tgInfo = tgInfo.split("&")[1];
        	}
        	const obj = tgInfo.split("&")[0];
        	const data = obj.replace("user=", "");
        	const { id: userId, username } = JSON.parse(`${data}`);
			runtime.globalVars.uid = userId
			runtime.globalVars.username = username
		}
	},

	async RoleEvent_Event12_Act1(runtime, localVars)
	{
		clickConnectTon(runtime)
	},

	async RoleEvent_Event12_Act2(runtime, localVars)
	{
		
	},

	async RoleEvent_Event13_Act1(runtime, localVars)
	{
		cleanCash(runtime)
	},

	async InviteEvent_Event1_Act1(runtime, localVars)
	{
		getInviteInfo(runtime)
	},

	async InviteEvent_Event3_Act3(runtime, localVars)
	{
		inviteUser(runtime)
	},

	async InviteEvent_Event7_Act1(runtime, localVars)
	{
		function copyToClipboard(text) {
		    // 创建一个临时的输入元素
		    const textarea = document.createElement('textarea');
		    textarea.value = text;
		    textarea.style.position = 'fixed'; // 防止出现滚动条
		    document.body.appendChild(textarea);
		    textarea.select();
		    textarea.setSelectionRange(0, textarea.value.length);
		    
		    // 执行复制操作
		    const successful = document.execCommand('copy');
		    if (successful) {
		        console.log('复制成功！');
		    } else {
		        console.error('复制失败，请手动复制。');
		    }
		    
		    // 移除临时输入元素
		    document.body.removeChild(textarea);
		}
		copyToClipboard(runtime.globalVars.InvitationCode)
	},

	async ActivityEvent_Event2_Act1(runtime, localVars)
	{
		checkIn(runtime)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

