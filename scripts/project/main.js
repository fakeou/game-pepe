import './jsEcrpyt.js'
async function getMeInfo (runtime) {
	if (window.axios && window.Telegram) {
		const token = localStorage.getItem("token");
		const tgData = window.Telegram.WebApp.initData;
		const request = globalThis.axiosRequest;
		if (token) {
		console.log(token)
			const { data } = await request.get("/user/me", {
			headers: {
			"Authorization": token,
 			//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b",
 			"x-telegram": tgData,
			}
		});
		runtime.globalVars.Highmiles = data.jumpHeightHighest
		runtime.globalVars.token = data.gameScore;
		runtime.getInstanceByUid(25).text = data.jumpHeightHighest
		runtime.globalVars.DailyCheckIn = data.curMonthSignInNums;
		runtime.globalVars.InvitationCode = data.shortCode
		data?.userProduct?.forEach?.((item, index) => {
			if (item.productId === 1) {
				runtime.globalVars.forest = 1
			}
			switch(item.productId) {
				case "1":
					runtime.globalVars.ownForest = 1;
					break;
				case "2":
					runtime.globalVars.ownMuscelPepe = 1;
					break;
				case "3":
					runtime.globalVars.ownTurmp = 1;
                    break;
				case "5":
					runtime.globalVars.ownSpringPepe = 1;
					break;
				case "5":
					runtime.globalVars.ownSpace = 1;
					break;
			}
		})
		}
	}
	
}

 async function clickLogin(runtime) {
	const tgData = window?.Telegram?.WebApp?.initData || null
	const request = globalThis.axiosRequest;
	try {
		 	const { data } =	await request.post("/login/tg", {},{ headers: {
 					//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b"
	"x-telegram": tgData,
	}})
		if (data?.accessToken) {
			localStorage.setItem("token", data.accessToken);
			runtime.globalVars.LogIn = 1;
		}

	} catch (e) {
		console.log(e)
		loading.isVisible = false;
		runtime.globalVars.LogIn = 0;
	}

}


function cleanCash(runtime) {
	globalThis?.tonUI?.disconnect?.()
}

runOnStartup(async runtime => {
	const axiosScript = document.createElement("script")
	const script = document.createElement("script")
	const tgSDKScript = document.createElement("script")
	//const encryptScript = document.createElement("script")
	axiosScript.src = "https://unpkg.com/axios/dist/axios.min.js"
	tgSDKScript.src = "https://telegram.org/js/telegram-web-app.js"
	
	script.src = "https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"
	
	//encryptScript.src = "https://passport.cnblogs.com/scripts/jsencrypt.min.js"

	globalThis.getMeInfo = getMeInfo;
	globalThis.clickLogin = clickLogin;
	const div = document.createElement("div");
	div.style.display = "none";
	div.id = "connectTon"
	script.onload = () => {
	    globalThis.tonUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://game-pepe-fakeous-projects.vercel.app/tonconnect-manifest.json',
        buttonRootId: 'connectTon'
    });
	console.log(tonUI)
	globalThis.tonUI.onStatusChange( async (wallet) => {
		const token = localStorage.getItem("token")
      if (wallet?.account && wallet?.connectItems) {
        globalThis.tonWallet = wallet;
		const tgData = window.Telegram.WebApp.initData;
		const request = globalThis.axiosRequest;
		const proof = wallet?.connectItems?.tonProof?.proof;
				const { data: friendlyAddressData } = await axios.get('https://toncenter.com/api/v2/packAddress', {
					params: {
						address: wallet.account.address
					}
				})
      	const par = {
        	payload: proof?.payload,
        	value: proof?.domain.value,
        	lengthBytes: proof?.domain.lengthBytes,
        	stateInit: tonWallet?.account?.walletStateInit,
        	signature: proof?.signature,
        	address: friendlyAddressData.result,
        	timestamp: proof?.timestamp,
      	};
		try {
				  	const {data} = await axiosRequest.post("/ton/bind", par, { headers: { 
 		//"x-telegram": "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b" ,
		"x-telegram": tgData,
		"Authorization": token,
		} } )
		runtime.globalVars.ownton = 1;
		} catch(e) {
			cleanCash(runtime)
		}
      } else {
        globalThis.tonWallet = null;
      }
    });

	}
	script.onerror = () => {
		alert('ton connect error')
	}
	axiosScript.onload = async () => {
		const axiosRequest = axios.create({
			baseURL: "https://dexperttest.xyz/ton-game/api/v1",
			headers: { 'x-chainId': '-2', 'x-chainName': 'ton', "x-app": 'pepeGame'}
		})

		axiosRequest.interceptors.response.use((res) => res, (err) => {
			if (err.response.data.code === 500) {
				runtime.getInstanceByUid(114).isVisible=true
				runtime.getInstanceByUid(115).isVisible=true
				runtime.getInstanceByUid(116).isVisible=true
				return err
			}

			return  Promise.reject(err.response)
		})
		globalThis.axiosRequest = axiosRequest
		await clickLogin(runtime)
		getMeInfo(runtime);
	}
	
	tgSDKScript.onload = async () => {
		const token = localStorage.getItem("token");
		const tgData = window.Telegram.WebApp.initData;
		window?.Telegram?.WebApp?.expand?.();
		//const tgData = "user=%7B%22id%22%3A2007070864%2C%22first_name%22%3A%22gan%22%2C%22last_name%22%3A%22mi%22%2C%22username%22%3A%22kaysfake%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5093642083902327580&chat_type=sender&auth_date=1721029686&hash=fe01a143c77bc50a4ccc6aeb9824a368d49fde6f631a447e5fb7e1ad0a3ff46b"
		if (token) {
			let tgInfo = decodeURIComponent(tgData);
        	if (tgInfo.includes("query_id")) {
          		tgInfo = tgInfo.split("&")[1];
        	}
        	const obj = tgInfo.split("&")[0];
        	const data = obj.replace("user=", "");
        	const { id: userId, username } = JSON.parse(`${data}`);
			runtime.globalVars.uid = userId
			runtime.globalVars.username = username
		} else {
			if (globalThis.axiosRequest) {
				await clickLogin(runtime)
				getMeInfo(runtime);
			}

		}
		
	}
	tgSDKScript.onerror = () => {
		alert('tg get error please refresh')
	}
	
	document.body.appendChild(div)
	document.head.appendChild(axiosScript)
	document.head.appendChild(script)
	document.head.appendChild(tgSDKScript)
	//document.head.appendChild(encryptScript)
})


