import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";

import {
  faHome,
  faSave,
  faEdit,
  faTrash,
  faPlus,

  faEyeSlash,
  faEye,
  faSearch,
  faArrowAltCircleLeft,
  faListUl,
  faTh,
  faUser,
  faUsers,
  faClock,
  faEnvelope,
  faMobileAlt,
  faUpload,
  faBell,
  faCar,
  faFileArchive,
  faFile,
  faPrint,
  faMinus,
  faPen,
  faTimes,
  faLocationArrow,
  faInfoCircle,
  faShoppingCart,
  faSignInAlt,
  faCheck,
  faBars,
  faShoppingBag,
  faTags
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faSave,
      faEdit,
      faTrash,
      faEyeSlash,
      faEye,
      faSearch,
      faArrowAltCircleLeft,
      faListUl,
      faTh,
      faUser, 
      faUsers,
      faClock,
      faEnvelope,
      faMobileAlt,
      faUpload,
      faBell,
      faCar,
      faFileArchive,
      faFile,
      faPrint,
      faPlus,
      faMinus,
      faPen,
      faTimes,
      faLocationArrow,
      faInfoCircle,
      faShoppingCart,
      faSignInAlt,
      faCheck,
      faBars,
      faShoppingBag,
      faTags
    );
  }
}
