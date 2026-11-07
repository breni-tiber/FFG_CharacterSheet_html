(function (mz,parentKey,subKey) {

  parentKey = window.location.href+"-char";

  function loadValue() {
    var _localStorage = localStorage[parentKey];
    if (_localStorage) {
      return JSON.parse(_localStorage);
    }
    return {};
  }
  function storeValue(data) {
    const str = JSON.stringify(data);
    localStorage.setItem(parentKey, str);
  }


  const prefix = "input-";

  const storeAll = "textarea,input,svg";
  const formArray = mz.querySelectorAll(storeAll);
  let data = loadValue();

  formArray.forEach((formItem) => {
    if (formItem) {
      const id = formItem.getAttribute("id");
      let subKey = null;
      if (id == null) {
        console.error("missing id", formItem);
        return;
      } else if (!id.startsWith(prefix)) {
        console.error("id", id, "is missing the prefix", prefix);
        return;
      } else {
        subKey = id.replace(/^input-/,'');
      }

      //field specific stuff
      var T = formItem.getAttribute("type");
      if (formItem.tagName == 'svg') {
        const maxRank = subKey.startsWith('skill-')? 6 : 7;
        subKey = subKey.replace(/^skill-/,'');

        if (data[subKey]) {
          formItem.setAttribute('rank', data[subKey]);
        }

        formItem.addEventListener('click', function() {
          let data = loadValue();
          data[subKey] = ((data[subKey]??0) + 1) % maxRank;
          formItem.setAttribute('rank', data[subKey]);
          storeValue(data);
        }, false);
        return;
      }
      if (T == "password" || T == "hidden" || T == "submit" || formItem.disabled) {
        console.log("Ignore: "+formItem.getAttribute("id"));
        return;
      } else if (T == "checkbox") {
        if (data[subKey]) {
          formItem.checked = data[subKey];
        }
        formItem.addEventListener('change', function() {
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

}(this.document,'',''));

