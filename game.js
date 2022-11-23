const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }

  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 0,
    text: 'Welcome to The Woods. Only the brave dare enter and only one has ever made it out alive. Do you dare enter?',
    options: [
      {
        text: 'Start',
        nextText: 1
      },
    ]
  },
  {
    id: 1,
    text: 'You wake up in an unfamiliar forest surrounded by tall trees. As you are gathering your surroundings, you hear a loud snapping of a twig.',
    options: [
      {
        text: 'Investigate the source of the noise',
        nextText: 2
      },
      {
        text: 'Proceed in the opposite direction',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forwards and stumble upon a small chipmunk',
    options: [
      {
        text: 'Put Chipmunk in pocket',
        setState: { chipmunk: true },
        nextText: 4
      },
      {
        text: 'Leave Chipmunk alone',
        nextText: 5
      },
      {
        text: 'Kick Chipmunk',
        nextText: 6
      }
    ]

  },
  {
    id: 3,
    text: 'You instantly fall into a punji pit and are impaled by the stakes on impact. You die a slow, painful, miserable death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'You and your new pal Cornelius Pudge continue forward through the thick forest. After several hours, you decide you both need to rest.',
    options: [
      {
        text: 'Sit against a shaded tree with Corny P nestled on your chest and fall asleep like two snug bugs in a rug.',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 7
      },
      {
        text: 'Take shelter in a nearby cave',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 8
      },
      {
        text: 'Decide against the nappy nap and continue on',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 9
      }
    ]
  },

  {
    id: 5,
    text: 'You look around and to your right you see what appears to be a trail under the fallen leaves. You eventually reach an old seemingly abandoned house in the woods.',
    options: [
      {
        text: 'Explore the exterior of the house',
        nextText: 10
      },
      {
        text: 'Knock on the front door',
        nextText: 11
      },
      {
        text: 'Climb through an unlocked window',
        nextText: 12
      }
    ]
  },
  {
    id: 6,
    text: 'While the chipmunk soars through the branches, a bear comes up from behind and mauls you to pieces, ensuring a very painful ending. Animal cruelty is NOT the answer kids.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You awake from your nap and find that you have been abandoned by Cornelius Pudge (The Deserter)',
    options: [
      {
        text: 'Express your sorrow outwardly and feel the deeppain of losing your only friend, blow your nose on a nearby leaf.',
        requiredState: (currentState) => currentState.chipmunk,
        setState: { chipmunk: false },
        nextText: 5
      },
      {
        text: 'Cry? I am no bebe.',
        requiredState: (currentState) => currentState.chipmunk,
        setState: { chipmunk: false },
        nextText: 13
      },
    ]
  },
  {
    id: 8,
    text: 'You wake up many hours later in desperate need of sustenence',
    options: [
      {
        text: 'Head out now before you get hangry',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 14
      },
      {
        text: 'Wait until first light',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 15
      }
    ]
  },
  {
    id: 9,
    text: 'You reach a bridge covered in a thick fog, it sounds like there is a city on the other side although you are unsure how far away or how safe the bridge is. ',
    options: [
      {
        text: 'Check under the bridge to see if you can cross easily',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 16
      },
      {
        text: 'I am the hero of this journey and I choose to cross this bridge',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 17
      }
    ]
  },
  {
    id: 10,
    text: 'You venture around back and look around. The back door appears to be slightly ajar and there is a mysterious path surrounded by massive hedges',
    options: [
      {
        text: 'Explore the mysterious path',
        nextText: 9
      },
      {
        text: 'Enter in to the house through the back door.',
        nextText: 18
      },
      {
        text: 'Leave',
        nextText: 19
      }
    ]
  },
  {
    id: 11,
    text: 'There is no answer at the door and it appears as if there is no one inside.',
    options: [
      {
        text: 'Knock again',
        nextText: 20
      },
      {
        text: 'Check if the door is unlocked',
        nextText: 21
      },
      {
        text: 'Explore around back',
        nextText: 10
      },
      {
        text: 'Leave',
        nextText: 19
      }
    ]
  },
  {
    id: 12,
    text: 'Once inside, you look around, you are surrounded by books and books and books... A library!',
    options: [
      {
        text: 'Pick up the closest book',
        nextText: 22
      },
      {
        text: 'Pick up the oldest book',
        nextText: 23
      },
      {
        text: 'Pick up the thickest book',
        nextText: 24
      },
      {
        text: 'Leave room via the closest door',
        nextText: 32
      },
    ]
  },
  {
    id: 13,
    text: 'Due to your refusal to feel your pain, you drown internally due to an abnormal amount of saltwater',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'You realize you could easily build a fire with surrounding brush if you could locate an animal nearby... or a bush with berries',
    options: [
      {
        text: 'You are confident in your fire building abilities and decide to scout the area for a potential tasty snack.',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 25
      },
      {
        text: 'I am a little lad who loves berries and cream!',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 26
      }
    ]
  },
  {
    id: 15,
    text: 'You have starved to death. Corny Pudgepants feasts on your remains for several months until eventually perishing as well due to obesity and lack of mobility.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'You walk around the side of the bridge and as you start to enter the shadowy area, you see a small stout figure.',
    options: [
      {
        text: 'With a puffed chest you call out "who goes there?"',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 27
      },
      {
        text: 'You scamper back up, dropping Cornelius along the way to brave the bridge.',
        requiredState: (currentState) => currentState.chipmunk,
        setState: { chipmunk: false },
        nextText: 28
      }
    ]
  },
  {
    id: 17,
    text: 'After a quick scan of what you can see that the bridge is wooden and very old.',
    options: [
      {
        text: 'Take it slow in the fog despite your hunger pangs.',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 29
      },
      {
        text: 'Bite your thumb at the rickety bridge and cross as quickly as possible',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 30
      }
    ]
  },
  {
    id: 18,
    text: 'You find yourself in a kitchen with a dining room table set for dinner and something lightly simmering on the stove. The hair on your arms starts to raise as you get the sense that you are not alone.',
    options: [
      {
        text: 'Walk out the back door and hastily walk down the mysterious path',
        nextText: 9
      },
      {
        text: 'Call out "Hello, I am friend not foe"',
        nextText: 31
      },
      {
        text: 'Quietly walk through a door left ajar to an unknown room',
        nextText: 32
      }

    ]
  },
  {
    id: 19,
    text: 'You turn around and are met face to face with a faceless shadow figure. The place where a mouth should be opens wide and as you see the blood-dripping teeth, your vision blacks out.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 20,
    text: 'You hear a rustle inside with this knock.',
    options: [
      {
        text: 'Knock for a third time',
        nextText: 33
      },
      {
        text: 'Check if the door is unlocked',
        nextText: 21
      },
      {
        text: 'Leave',
        nextText: 19
      }
    ]
  },
  {
    id: 21,
    text: 'The door is unlocked!',
    options: [
      {
        text: 'Slowly and quietly open the door',
        nextText: 34
      },
      {
        text: 'Say "Hello? Is anyone home?',
        nextText: 35
      },
      {
        text: 'Leave',
        nextText: 19
      }
    ]
  },
  {
    id: 22,
    text: 'The title reads: "Frankenstein" by Mary Shelley',
    options: [
      {
        text: 'Open book and read first line',
        nextText: 36
      },
      {
        text: 'Open book and read last line',
        nextText: 37
      },
      {
        text: 'Put the book back',
        nextText: 38
      }
    ]
  },
  {
    id: 23,
    text: 'You cannot make out the title as the book is covered and dust and very worn and fragile.',
    options: [
      {
        text: 'Put it back as not to damage it further',
        nextText: 39
      },
      {
        text: 'Open it to the title page',
        nextText: 40
      }
    ]
  },
  {
    id: 24,
    text: 'The title reads: Dracula',
    options: [
      {
        text: 'Open book and read first line',
        nextText: 36
      },
      {
        text: 'Open book and read last line',
        nextText: 37
      },
      {
        text: 'Put the book back',
        nextText: 38
      }
    ]
  },
  {
    id: 25,
    text: 'You see a fox not far off and no that you would be able to roast enough meat from it to feed you for days.',
    options: [
      {
        text: 'Try your hand at trapping it',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 41
      },
      {
        text: 'Look at Cornelius Pudge... Look at the fox... Look at pudge.....',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 42
      }
    ]
  },
  {
    id: 26,
    text: 'You do a quick circle of the surrounding area and notice three different types of berries. You know little of what is and is not posionous but using your minor knowledge know you have the following options:',
    options: [
      {
        text: 'a round purple berry which you know will either improve your mental clarity or have you foaming from the mouth in minutes',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 43
      },
      {
        text: 'a red hard berry that you know little of at all besides the taste is undesirable',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 44
      },
      {
        text: 'a blue puffy berry that you believe to be safe despite the potential for a light stomachache',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 45
      }
    ]
  },
  {
    id: 27,
    text: 'You see a strange smirk appear on their face as they say "and who dares ask such an insulting question?", no one enters beneath this bridge without knowing who I am. ',
    options: [
      {
        text: 'You realize your error and apologize profusely to the creature.',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 47
      },
      {
        text: 'You say "Ha! You try to trick me goblin, I call you on your bluff!"',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 48
      }
    ]
  },
  {
    id: 28,
    text: '',
    options: [
      {
        text: '',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 1
      }
    ]
  },
  {
    id: 29,
    text: '',
    options: [
      {
        text: '',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 1
      }
    ]
  },
  {
    id: 30,
    text: '',
    options: [
      {
        text: '',
        requiredState: (currentState) => currentState.chipmunk,
        nextText: 1
      }
    ]
  },
  {
    id: 31,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 32,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 33,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 34,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 35,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 36,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 37,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 38,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 39,
    text: '',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
  {
    id: 40,
    text: 'old worn book.. if not spooky witchy have it read It says "The Holy Bible" and upon further inspection you realize it is a very early edition.',
    options: [
      {
        text: '',
        nextText: 1
      }
    ]
  },
]

startGame()