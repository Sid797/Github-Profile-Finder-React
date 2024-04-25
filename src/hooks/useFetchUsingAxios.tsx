import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface FetchData {
  responseData: any; // Adjust this type based on your API response structure
  loading: boolean;
  error: boolean;
  errorMsg: string | null;
}

const useFetchUsingAxios = (url: string): FetchData => {
  const [responseData, setResponseData] = useState<any>(null); // Adjust this type based on your API response structure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(url);
        setResponseData(response.data);
        setLoading(false);
      } catch (errorFetching:AxiosError) {
        setError(true);
        setErrorMsg(errorFetching.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { responseData, loading, error, errorMsg };
};

export default useFetchUsingAxios;
