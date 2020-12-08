
import { gql } from 'apollo-boost';

const addBookMutation = gql`
    mutation ($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
const profileUpdateMutation = gql`
  mutation($restaurantID: String $Hours: String, $Description: String, $Cusine: String, $PickMethod: String, $ContactEmail: String, $PhoneNo:String) {
    restaurantprofileupdate(restaurantID: $restaurantID, Hours: $Hours, Description: $Description, Cusine: $Cusine, PickMethod: $PickMethod, ContactEmail: $ContactEmail,PhoneNo: $PhoneNo) {
      Result
    }
  }
`;
const menuUploadMutation = gql`
  mutation($restaurantID: String $DishName: String, $Mainingredients: String, $DishPrice: String, $Description: String, $Category: String) {
    menuAddItem(restaurantID: $restaurantID, DishName: $DishName, Mainingredients: $Mainingredients, DishPrice: $DishPrice, Description: $Description, Category: $Category) {
      Result
    }
  }
`;
const updateStatusMutation = gql`
    mutation ($orderID: String, $OrderStatus: String){
        orderUpdatestat(orderID: $orderID, OrderStatus: $OrderStatus){
          Result
        }
    }
`;
export {addBookMutation,profileUpdateMutation,updateStatusMutation,menuUploadMutation};