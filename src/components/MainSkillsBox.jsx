import React from 'react';
import { BaseInfo, BaseParams, Skills } from '../moduls/Skills';
import { observer } from 'mobx-react-lite';

const MainSkillsBox = observer(({model}) => {
  const [ skills ] = React.useState(model);

  return skills.listSkills.map((item) => (
      <div className='skil'>
        <div className='level2'>{item.name}</div>
        <div className='count4'>{skills[item.key]}</div>
      </div>
  ));
});

export default MainSkillsBox;
