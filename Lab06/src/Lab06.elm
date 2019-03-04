import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)





main =
  Browser.sandbox { init = init, update = update, view = view }




type alias Model =
  { string1 : String
  , string2 : String
  }


init : Model
init =
  Model "" ""





type Msg
  = String1 String
  | String2 String



update : Msg -> Model -> Model
update msg model =
  case msg of
    String1 string1 ->
      { model | string1 = string1 }

    String2 string2 ->
      { model | string2 = string2 }






view : Model -> Html Msg
view model =
  div []
    [ viewInput "String1"  model.string1 String1
    , viewInput "String2"  model.string2 String2
    ,  div [] [ text (model.string1)
    , text":"
    , text (model.string2) ]
    ]

viewInput : String -> String -> (String -> msg) -> Html msg
viewInput p v tomsg =
  input [ placeholder p, value v, onInput tomsg ] []


