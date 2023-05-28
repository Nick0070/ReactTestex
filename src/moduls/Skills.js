import { types } from 'mobx-state-tree';
import { getSnapshot } from 'mobx-state-tree';

export const BaseSkill = {
  FORCE: 'force',
  ATTACK: 'attack',
  DEXTERITY: 'dexterity',
  STEALTH: 'stealth',
  ARCHERY: 'archery',
  INTELLIGENCE: 'intelligence',
  LEARNABILITY: 'learnability',
  SURVIVAL: 'survival',
  MEDICINE: 'medicine',
  CHARISMA: 'charisma',
  INTIMIDATION: 'intimidation',
  INSIGHT: 'insight',
  APPEARANCE: 'appearance',
  MANIPULATION: 'MANIPULATION',
};

export const BaseParams = {
  HEALTH: 'health',
  EVASION: 'evasion',
  ENERGY: 'energy',
};

export const BaseInfo = {
  MIN_HP: 'minHp',
  MAX_HP: 'maxHp',
  SKILLS: 'skills',
};

const getDefaultModelSkills = () => {
  return Object.values(BaseSkill).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
};

const getDefaultModelParams = () => {
  return { health: 3, evasion: 10, energy: 0 };
};

const getDefaultModelInfo = () => {
  return { maxHp: 3, minHp: 3, skills: 25 };
};

export const Skills = types
  .model({
    name: '',
    ...getDefaultModelInfo(),
    ...getDefaultModelParams(),
    ...getDefaultModelSkills(),
  })

  .actions((self) => ({
    updateUsername(value) {
      self['name'] = value;
    },
    addSkill(key) {
      const fns = {
        [BaseSkill.FORCE]: handleForceChange,
        [BaseSkill.DEXTERITY]: handleDexterityChange,
        [BaseSkill.INTELLIGENCE]: handleIntelligenceChange,
      };

      const fn = fns[key] || handleSkillChange;

      return fn(self, key);
    },
    exportData() {
      const json = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(getSnapshot(self)))}`;
      const link = document.createElement('a');
      link.href = json;
      link.download = 'save.json';
      link.click();
    },
  }))
  .views((self) => ({
    isDisable(key) {
      if (!self[BaseInfo.SKILLS]) {
        return true;
      }

      let block = false;
      this.list.forEach((item) => {
        if (item.key === key) {
          if (self[item.key] >= 5) {
            block = true;
          }
        }

        item.child.forEach((child) => {
          if (child.key === key) {
            if (self[item.key] < 1 || self[child.key] >= 5) {
              block = true;
            }
          }
        });
      });

      return block;
    },

    
    get listSkills() {
      return [
        {
          key: BaseParams.HEALTH,
          name: 'Жизненная сила',
        },
        {
          key: BaseParams.EVASION,
          name: 'Уклонение',
        },
        {
          key: BaseParams.ENERGY,
          name: 'Энергичность',
        },
       
      ];
    },

    get list() {
      return [
        {
          key: BaseSkill.FORCE,
          name: 'Сила',
          child: [
            {
              key: BaseSkill.ATTACK,
              name: 'Атака',
            },
          ],
        },
        {
          key: BaseSkill.DEXTERITY,
          name: 'Ловкость',
          child: [
            {
              key: BaseSkill.STEALTH,
              name: 'Стелс',
            },
            {
              key: BaseSkill.ARCHERY,
              name: 'Стрельба из лука',
            },
          ],
        },
        {
          key: BaseSkill.INTELLIGENCE,
          name: 'Интиллект',
          child: [
            {
              key: BaseSkill.LEARNABILITY,
              name: 'Обучаемость',
            },
            {
              key: BaseSkill.SURVIVAL,
              name: 'Выживание',
            },
            {
              key: BaseSkill.MEDICINE,
              name: 'Медицина',
            },
          ],
        },
        {
          key: BaseSkill.CHARISMA,
          name: 'Харизма',
          child: [
            {
              key: BaseSkill.INTIMIDATION,
              name: 'Запугивание',
            },
            {
              key: BaseSkill.INSIGHT,
              name: 'Проницательность',
            },
            {
              key: BaseSkill.APPEARANCE,
              name: 'Внешний вид',
            },
            {
              key: BaseSkill.MANIPULATION,
              name: 'Манипулирование',
            },
          ],
        },
      ];
    },
  }));

const handleForceChange = (self, key) => {
  self[BaseInfo.MAX_HP] = self[BaseInfo.MAX_HP] + 1;
  self[BaseParams.HEALTH] = self[BaseParams.HEALTH] + 1;
  handleSkillChange(self, key);
};

const handleDexterityChange = (self, key) => {
  self[BaseParams.EVASION] = self[BaseParams.EVASION] + 1;
  self[BaseParams.ENERGY] = self[BaseParams.ENERGY] + 1;
  handleSkillChange(self, key);
};

const handleIntelligenceChange = (self, key) => {
  self[BaseParams.ENERGY] = self[BaseParams.ENERGY] + 1;
  handleSkillChange(self, key);
};

const handleSkillChange = (self, key) => {
  self[key] = self[key] + 1;
  self[BaseInfo.SKILLS] = self[BaseInfo.SKILLS] - 1;
};
