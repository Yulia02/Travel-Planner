import React, { useState } from 'react';
import './PlaceTypeSelect.css';

const TagSelection = ({onChange}) => {
    const [selectedTag, setSelectedTag] = useState('');

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
        onChange(event.target.value);
    };

    const TYPES = [
        { value: 'amusement_park', title: 'Парк розваг' },
        { value: 'aquarium', title: 'Акваріум' },
        { value: 'art_gallery', title: 'Мистецька галерея' },
        { value: 'bakery', title: 'Пекарня' },
        { value: 'bar', title: 'Бар' },
        { value: 'book_store', title: 'Книжковий магазин' },
        { value: 'bowling_alley', title: 'Боулінг' },
        { value: 'cafe', title: 'Кафе' },
        { value: 'campground', title: 'Місце для кемпінгу' },
        { value: 'car_rental', title: 'Прокат автомобілів' },
        { value: 'casino', title: 'Казино' },
        { value: 'clothing_store', title: 'Магазин одягу' },
        { value: 'dentist', title: 'Стоматолог' },
        { value: 'department_store', title: 'Універмаг' },
        { value: 'doctor', title: 'Лікар' },
        { value: 'drugstore', title: 'Аптека' },
        { value: 'electronics_store', title: 'Магазин електроніки' },
        { value: 'embassy', title: 'Посольство' },
        { value: 'florist', title: 'Квітковий магазин' },
        { value: 'gas_station', title: 'АЗС' },
        { value: 'gym', title: 'Спортзал' },
        { value: 'hair_care', title: 'Салон краси для волосся' },
        { value: 'home_goods_store', title: 'Магазин товарів для дому' },
        { value: 'hospital', title: 'Лікарня' },
        { value: 'jewelry_store', title: 'Магазин прикрас' },
        { value: 'laundry', title: 'Пральня' },
        { value: 'library', title: 'Бібліотека' },
        { value: 'liquor_store', title: 'Магазин алкоголю' },
        { value: 'lodging', title: 'Готель' },
        { value: 'meal_delivery', title: 'Доставка їжі' },
        { value: 'meal_takeaway', title: 'Їжа на винос' },
        { value: 'mosque', title: 'Мечеть' },
        { value: 'movie_rental', title: 'Прокат фільмів' },
        { value: 'movie_theater', title: 'Кінотеатр' },
        { value: 'museum', title: 'Музей' },
        { value: 'night_club', title: 'Нічний клуб' },
        { value: 'park', title: 'Парк' },
        { value: 'parking', title: 'Парковка' },
        { value: 'restaurant', title: 'Ресторан' },
        { value: 'shopping_mall', title: 'Торговий центр' },
        { value: 'spa', title: 'Спа-салон' },
        { value: 'stadium', title: 'Стадіон' },
        { value: 'store', title: 'Магазин' },
        { value: 'supermarket', title: 'Супермаркет' },
        { value: 'synagogue', title: 'Синагога' },
        { value: 'taxi_stand', title: 'Стоянка таксі' },
        { value: 'tourist_attraction', title: 'Туристична визначна пам\'ятка' },
        { value: 'train_station', title: 'Залізнична станція' },
        { value: 'travel_agency', title: 'Туристичне агентство' },
        { value: 'university', title: 'Університет' },
        { value: 'zoo', title: 'zoo' },
    ]

    return (
        <div className="select-container">
            <h2>Оберіть опцію:</h2>
            <select value={selectedTag} onChange={handleTagChange}>
                {TYPES.map(({value, title}) => <option value={value}>{title}</option>)}
            </select>
        </div>
    );
};

export default TagSelection;
