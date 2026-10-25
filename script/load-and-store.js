(function (mz,parentKey,subKey) {

  parentKey = window.location.href+"-char";

  function loadValue() {
    var _localStorage = localStorage[parentKey];
    if (_localStorage) {
      return JSON.parse(_localStorage);
    }
	return {}
  }
  function storeValue(data){
	const str = JSON.stringify(data);
	localStorage.setItem(parentKey, str);
  }

  const prefix = "input-";

  setTimeout(function() {
    const storeAll = "textarea,input";
    const formArray = mz.querySelectorAll(storeAll);
	let data = loadValue();

    formArray.forEach((formItem) => {
      if (formItem) {
      	var T = formItem.getAttribute("type");
		const id = formItem.getAttribute("id");
        let subKey = null;
        if (id == null) {
		  console.error("missing id", formItem);
		} else if (!id.startsWith(prefix)) {
		  console.error("id", id, "is missing the prefix", prefix);
		} else {
			subKey = id.replace(/^input-/,'');
		}

      	if (T == "password" || T == "hidden" || T == "submit" || formItem.disabled) {
      	  console.log("Ignore: "+formItem.getAttribute("id")); 
      	  return;
      	} else if (T == "checkbox") {
          if (data[subKey]){
            formItem.checked = data[subKey];
		  }
		  formItem.addEventListener('change', function(){
	        let data = loadValue();
            data[subKey] = formItem.checked;
		    storeValue(data);
		  }, false);
	  	} else {
          if (data[subKey]) {
            formItem.value = data[subKey];
		  }
          formItem.addEventListener("keyup", function () {
	        let data = loadValue();
            data[subKey] = formItem.value;
		    storeValue(data);
          }, false);
		}
        formItem;
      }
    });
	console.log("loaded char",data["char-name"],"with data",data)
  }, 1);
}(this.document,'',''));
