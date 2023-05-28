import React from 'react';
import { BaseInfo, Skills } from '../moduls/Skills';
import { observer } from 'mobx-react-lite';

const LevelBox = observer(({model}) => {
  const [ skills ] = React.useState(model);

  return (
    <div className='skils'>
      <div className='level'>Очки - </div>
      <div className='count'>{skills[BaseInfo.SKILLS]}</div>
    </div>
  );
});

export default LevelBox;
