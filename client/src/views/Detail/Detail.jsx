import React from "react";
import { getDogDetail, clearDogDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail() {
  let dispatch = useDispatch();
  let { id } = useParams();

  const dogDetail = useSelector((state) => state.dogDetail);

  const navigate = useNavigate();
  function backToHome() {
    dispatch(clearDogDetail());
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.containerDetail}>
      {dogDetail.id ? (
        <div>
          <h2>
            {dogDetail.name}{" "}
            <button className={styles.backButton} onClick={backToHome}>
              Exit
            </button>
          </h2>
          <img className={styles.imgDetail} src={dogDetail.image} alt={dogDetail.name} />
          <div className={styles.details}>
          <h3>Id: {dogDetail.id}</h3>
            <h3>Weight (min - max): {dogDetail.weight} kg</h3>
            <h3>Height (min - max): {dogDetail.height} cm</h3>
            <h3>Life Span: {dogDetail.life_span}</h3>
            <h3>
              Temperament:{" "}
              {dogDetail.temperaments
                ? dogDetail.temperaments.map((temperament) => temperament.name).join(", ")
                : dogDetail.temperament}
            </h3>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
