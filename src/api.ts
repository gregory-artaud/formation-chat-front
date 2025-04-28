class ApiService {
  private _baseApiUrl: string;

  constructor() {
    const envBaseApiUrl = import.meta.env.VITE_API_BASE_URL ?? null;

    if (envBaseApiUrl === null) {
      throw new Error("VITE_API_BASE_URL is missing in .env");
    }
    this._baseApiUrl = envBaseApiUrl;
  }

  async get(path: string) {
    return await fetch(this._baseApiUrl + path);
  }

  async post(path: string, data: unknown) {
    return await fetch(this._baseApiUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

const apiService = new ApiService();
export default apiService;
