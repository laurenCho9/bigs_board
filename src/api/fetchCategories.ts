import { Axios } from "./Axios";

const fetchCategories = async () => {
  try {
    const response = await Axios.get("/boards/categories");
    console.log("카테고리 데이터:", response.data);
  } catch (error) {
    console.error("카테고리 조회 실패:", error);
  }
};

export { fetchCategories };
