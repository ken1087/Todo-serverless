export default class APIHandler {
  constructor() {}

  async getList() {
    const request = new APIRequest("GET", "/kang/todo", null);
    const response = await APIProcessor(request);
    if (response !== "Error") {
      return response.Items;
    } else {
      return null;
    }
  }

  async postTodo(obj) {
    const request = new APIRequest("POST", "/kang/todo", {
      content: obj.content,
    });
    const response = await APIProcessor(request);
    if (response !== "Error") {
      return response.id;
    } else {
      return null;
    }
  }

  async putTodo(obj) {
    const request = new APIRequest("PUT", `/kang/todo/${obj.id}`, {
      content: obj.content,
    });
    await APIProcessor(request);
  }

  async deleteTodo(id) {
    const request = new APIRequest("DELETE", `/kang/todo/${id}`);
    await APIProcessor(request);
  }
}

const HOST = "https://bgrq7opv03.execute-api.ap-northeast-1.amazonaws.com/prod";

class APIRequest {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = HOST + path;
    this.body = body;
  }
}

const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "kyR0ZXyCGt47TFw34iF4F3wCcBgYwnAf2tbd5sbN",
      },
      body: request.body ? JSON.stringify(request.body) : null, // body data type must match "Content-Type" header
    });
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();
      case 204:
        return null;
      default:
        console.error(await reponse.json());
        return "Error";
    }
  } catch (error) {
    console.log(error.error(error));
  }
  return "Error";
};
