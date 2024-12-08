import React, { useEffect, useState } from "react";
import TopMenu from "../TopMenu/TopMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Space from "../../components/Space/Space";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useGetFoodsQuery } from "../redux/services/foodsApi";
import FoodBox from "../FoodBox/FoodBox";
import "../../styles/main.scss";
import SearchPannel from "../SearchPanel/SearchPanel";
import ScrollButton from "../ScrollButton/ScrollButton ";
import Error from "../Error/Error";

import Warning from "../Warning/Warning";

const Foods = () => {
  const { data: foods, error, isLoding } = useGetFoodsQuery();

  const [searchedItem, setSarchedItem] = useState();
  const [filteredFoods, setFilteredFoods] = useState(foods);

  const handleInputChange = (event) => {
    setSarchedItem(event.target.value);
  };

  useEffect(() => {
    if (searchedItem === undefined) {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter((food) =>
          food.title.toLowerCase().includes(searchedItem.toLowerCase())
        )
      );
    }
  }, [searchedItem][foods]);

  return (
    <div className="food">
      <TopMenu />
      <Header />
      <Space />
      <Space />
      <Space />
      <Space />

      <SearchPannel handleInputChange={handleInputChange}></SearchPannel>
      <Space />
      <SectionTitle>غذاهای موجود</SectionTitle>
      <div className="food container-custom">
        {error ? (
          <Error>احتمالا خطایی رخ داده است</Error>
        ) : isLoding ? (
          <Warning>در حال واکشی اطلاعات</Warning>
        ) : foods && filteredFoods ? (
          <div className="foods-container">
            {filteredFoods.map((food) => (
              <FoodBox
                key={food.id}
                id={food.id}
                title={food.title}
                src={food.img}
                price={food.price}
                info={food.info}
              ></FoodBox>
            ))}
          </div>
        ) : null}
      </div>
      <Space />
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Foods;
