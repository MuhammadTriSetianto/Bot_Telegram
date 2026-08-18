import axios from "axios";
import { TOKEN_TOOLXL, URL_TOOLXL } from "../config/env";

export class ApiService {

  private axios = axios.create({
    baseURL:`${URL_TOOLXL}`,
    headers: {
      "X-Api-Key": TOKEN_TOOLXL,
      "Content-Type": "application/json",
    },
  });

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.axios.get<T>(endpoint,);

    return response.data;
  }

  async post<T>(
    endpoint: string,
    body: Record<string, any>,
  ): Promise<T> {
    const response = await this.axios.post<T>(
      endpoint,
      body
    );

    return response.data;
  }
}