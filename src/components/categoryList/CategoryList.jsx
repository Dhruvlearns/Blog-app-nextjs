import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const CategoryList = async () => {
  try {
    const data = await getData();
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>
        <div className={styles.categories}>
          {data?.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.category} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={32}
                  height={32}
                  className={styles.image}
                />
              )}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering CategoryList component:', error);
    return <div>Error loading categories. Please try again later.</div>;
  }
};

export default CategoryList;
