import React from "react";

import './Title.css';

type TitleProps = {
  titleString : string;
  titleSize?: string;
  isSubtitle?: boolean;
}

const Title = ({titleString, titleSize="45", isSubtitle=false} : TitleProps) => {
  return (
    <div className={`title ${isSubtitle?"subtitle":""}`} style={{fontSize: titleSize+"px"}}>
      {titleString}
    </div>
  );
}

export default Title;