import { type Guitar } from "../data/db"


export const GuitarCard = ({guitarDetails,addToCart}:{guitarDetails:Guitar,addToCart:(guitar:Guitar) => void}) => {

const {name,image,description,price} = guitarDetails;



  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt={`imagen guitarra ${name}`} />
        </div>
        <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() =>  addToCart(guitarDetails)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" style={{marginRight:"1rem"}} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Agregar al Carrito
            </button>
        </div>
    </div>
  )
}
