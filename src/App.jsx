
import React from 'react';

import './App.scss';
import './css/LeftBox.scss';
import './css/LevelBox.scss';
import Video from './Video/VideoBg.mp4';
import { Skills } from './moduls/Skills';
import { observer } from 'mobx-react-lite';

import LeftBox from './components/LeftBox';
import LevelBox from './components/LevelBox';
import SkillsBox from './components/SkillsBox';
import MainSkillsBox from './components/MainSkillsBox';


const Home = observer(() => {
  const [skills] = React.useState(Skills.create());

  return (
    <div className='main'>

        <video className='vidio' src={Video} autoPlay loop muted/>
          <div className='content'>
            <div className='left'>
                <LeftBox model={skills}/>
            </div>

            <div className='right'>
              <div className='box2'>
                    <LevelBox model={skills}/>
                  <div className='skils2'>
                    <div className='line'/>
                      <MainSkillsBox model={skills}/>
                    <div className='line'/>
                        <SkillsBox model={skills}/>
                  </div>
                </div>
            </div>
          </div>
    </div>
  );
});

export default Home;
