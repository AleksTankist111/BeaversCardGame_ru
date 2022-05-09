const App = {
    data(){
        return {
            modal: undefined, //If card description was called
            cardModal: undefined, //What card was called as modal
            cur: undefined, //Who is playing now
            cardChosen: undefined, //What card has chosen to be played (place in hand)
            maxDeckSize: 15,
            handSize: 5,
            maxEnergy: 10,
            _cardsList: [
                {
                    id: 0,
                    title: 'Бобёр-строитель',
                    description: 'Щааааас он тебе настроит всякого! Прибавляет бобрам по соседству по единице брони.',
                    image: './images/bobr1.jpg',
                    attack: 1,
                    defence: 3,
                    price: 3,
                    ability: (place) => {
                        let cur = this.cur;
                        if (place > 0) {
                            if (cur.onDesk[place - 1]) {
                                cur.onDesk[place-1].defence++;
                            }
                        }
                        if (place < (cur.onDesk.length - 1)) {
                            if (cur.onDesk[place + 1]) {
                                cur.onDesk[place+1].defence++;
                            }
                        }
                    }
                },
                {
                    id: 1,
                    title: 'Взрослый бобёр',
                    description: 'Обычный бобёр. Любит дерево, плотины и плавать. Больно кусает.',
                    image: './images/bobr2.png',
                    attack: 2,
                    defence: 2,
                    price: 2,
                    ability: (place) => {}
                },
                {
                    id: 2,
                    title: 'Бобёр-тусовщик',
                    description: 'Зажжет пати на доске! Пиво, водка, виски... Он знает, как веселиться. Вот только похмелье бьёт...  Все слабые бобры на доске (атака<3)  получают -1 к атаке, а сильные (атака >=3) +1 к силе.',
                    image: './images/bobr3.jpg',
                    attack: 4,
                    defence: 3,
                    price: 4,
                    ability: (place) => {
                        for (let cardIdx in this.cur.onDesk) {
                            if (this.cur.onDesk[cardIdx]) {
                                if (this.cur.onDesk[cardIdx].attack < 3) {
                                    this.cur.onDesk[cardIdx].attack --
                                    if (this.cur.onDesk[cardIdx].attack < 0) {this.cur.onDesk[cardIdx].attack = 0}
                                }
                                else {
                                    this.cur.onDesk[cardIdx].attack ++
                                }
                            }
                        }
                        let enemy
                        if (this.cur === this.player) {
                            enemy = this.pc
                        }
                        else {enemy = this.player}
                        for (let cardIdx in enemy.onDesk) {
                            if (enemy.onDesk[cardIdx]) {
                                if (enemy.onDesk[cardIdx].attack < 3) {
                                    enemy.onDesk[cardIdx].attack --
                                    if (enemy.onDesk[cardIdx].attack < 0) {enemy.onDesk[cardIdx].attack = 0}
                                }
                                else {
                                    enemy.onDesk[cardIdx].attack ++
                                }
                            }
                        }
                    }
                },
                {
                    id: 3,
                    title: 'Минибобёр',
                    description: 'Личинка взрослого бобра. Вырастет он еще не скоро, но одно известно точно: все взрослые бобры умиляются его лапочности и получают +1 к атаке и защите из-за материнских и отцовских инстинктов.',
                    image: './images/bobr4.jpg',
                    attack: 0,
                    defence: 1,
                    price: 2,
                    ability: (place) => {
                        for (let cardIdx in this.cur.onDesk) {
                            if (this.cur.onDesk[cardIdx]) {
                                if (this.cur.onDesk[cardIdx].id === 1) {
                                    this.cur.onDesk[cardIdx].attack++
                                    this.cur.onDesk[cardIdx].defence++
                                }
                            }
                        }
                    }
                },
                {
                    id: 4,
                    title: 'Вор-бобёр',
                    description: 'А по нему не видно? Сопрёт у бобра напротив характеристики (2 атаки и 2 защиты, но не меньше 1) и убежит, если есть свободное место! ',
                    image: './images/bobr5.jpg',
                    attack: 2,
                    defence: 2,
                    price: 5,
                    ability: (place) => {
                        let enemy
                        if (this.cur === this.player) {
                            enemy = this.pc
                        }
                        else {enemy = this.player}
                        if (enemy.onDesk[place]) {
                            if (enemy.onDesk[place].attack >= 2) {
                                this.cur.onDesk[place].attack += 2
                                enemy.onDesk[place].attack -= 2
                            }
                            else if (enemy.onDesk[place].attack === 1) {
                                this.cur.onDesk[place].attack += 1
                                enemy.onDesk[place].attack -= 1
                            }
                            if (enemy.onDesk[place].defence > 2) {
                                this.cur.onDesk[place].defence += 2
                                enemy.onDesk[place].defence -= 2
                            }
                            else if (enemy.onDesk[place].defence === 2) {
                                this.cur.onDesk[place].defence += 1
                                enemy.onDesk[place].defence -= 1
                            }
                            if (this.cur.onDesk.indexOf(undefined) !== -1) {
                                this.cur.onDesk[this.cur.onDesk.indexOf(undefined)] = this.cur.onDesk[place]
                                this.cur.onDesk[place] = undefined
                            }
                        }
                    }
                },
                {
                    id: 5,
                    title: 'Бобёр-стрелочник',
                    description: '"А чё я, я ничё! Это он чё?!"(с) \n Хитрый и сильный говнюк, но подставляет соратников (-2 к атаке у бобра слева).',
                    image: './images/bobr6.jpg',
                    attack: 5,
                    defence: 6,
                    price: 4,
                    ability: (place) => {
                        let cur = this.cur;
                        if (place > 0) {
                            if (cur.onDesk[place - 1]) {
                                cur.onDesk[place-1].attack = Math.max(0, cur.onDesk[place-1].attack - 2)
                            }
                        }
                    }
                },
                {
                    id: 6,
                    title: 'Мегабобёр',
                    description: 'Ну вы знаете. Он крут. Точка.',
                    image: './images/bobr7.jpg',
                    attack: 8,
                    defence: 8,
                    price: 7,
                    ability: (place) => {}
                },
                {
                    id: 7,
                    title: 'Бобриная голова',
                    description: 'Голова бобра без тела Видимо, бобра-врага. Уххх, жуть. Особенно для противников. Все бобры противника получают 1 урон.',
                    image: './images/bobr8.png',
                    attack: 0,
                    defence: 1,
                    price: 2,
                    ability: (place) => {
                        let enemy
                        if (this.cur === this.player) {
                            enemy = this.pc
                        }
                        else {enemy = this.player}
                        for (cardIdx in enemy.onDesk) {
                            if (enemy.onDesk[cardIdx]) {
                                enemy.onDesk[cardIdx].defence -= 1
                                if (enemy.onDesk[cardIdx].defence <=0) {
                                    enemy.onDesk[cardIdx] = undefined
                                }
                            }
                        }
                    }
                },

            ],
            player: {
                deck: [],
                life: 20,
                energyLimit:2,
                energyCurrent: 2,
                hand: [],
                onDesk: [undefined, undefined, undefined, undefined],

            },
            pc: {
                deck: [],
                life: 20,
                energyLimit:2,
                energyCurrent: 2,
                hand: [],
                onDesk: [undefined, undefined, undefined, undefined],
            },
        }
    },
    methods: {
        closeModal(){
            this.modal.style.display = 'none'
        },
        openModal(card){
            this.cardModal = card
            this.modal = this.$refs.fullCardView
            this.modal.style.display = 'flex'
        },
        startGame(){
            // 0) Создать колоды и раздать карты
            let i = this.maxDeckSize
            let j = this.handSize
            while (i > 0) {
                this.player.deck.push({...this._cardsList[Math.floor(Math.random() * this._cardsList.length)]})
                this.pc.deck.push({...this._cardsList[Math.floor(Math.random() * this._cardsList.length)]})
                i--
            }
            while (j>0) {
                this.player.hand.push(this.player.deck.pop())
                this.pc.hand.push(this.pc.deck.pop())
                j--
            }
            // 1) Определить того, кто первый ходит
            const turn = Boolean(Math.floor(Math.random() * 2))
            this.cur = turn ? this.pc : this.player
            // 2) Если первым ходит комп, то пусть ходит:
            if (turn) {
                this.player.energyLimit ++
                this.pcTurn()
            }
            else {
                this.pc.energyLimit++
                this.startTurn()
            }

        },
        pcTurn(){
            // Показать, что сейчас ход противника
            this.cur = this.pc
            this.$refs.playerTurnSquare.style.background = '#ce2929'
            this.$refs.pcTurnSquare.style.background = 'green'
            // Выдать ему карту и пополнить энергию
            this.pc.energyCurrent = this.pc.energyLimit
            // ИИ компа (играть слабейшими)
            let freeSpaceOnDesk = ()=> {return (this.pc.onDesk.indexOf(undefined) !== -1)}
            let cardsInHand = ()=> {return Boolean(this.pc.hand.find((el)=>{return el !== undefined}))}
            let findCheapest = () => {
                let cheapestPrice = this.maxEnergy
                let cheapestCard = undefined
                for (let card in this.pc.hand) {
                    if (this.pc.hand[card]) {
                        if (this.pc.hand[card].price < cheapestPrice) {
                            cheapestPrice = this.pc.hand[card].price
                            cheapestCard = this.pc.hand[card]
                        }
                    }
                }
                return cheapestCard
            }

            let recursiveWait = () => {
                if (cardsInHand() && freeSpaceOnDesk() && (this.pc.energyCurrent >= findCheapest().price)) {
                        this.cardChosen = this.pc.hand.indexOf(findCheapest())
                        let freePlace = this.pc.onDesk.indexOf(undefined)
                        this.playCard(freePlace)
                        setTimeout(recursiveWait,1000)
                    }
                else {
                    setTimeout(()=>{
                        // Фаза атаки
                        this.attackPhase()
                        // Окончить ход и запустить ход противника
                        this.addCardToHand()
                        this.cur.energyLimit++
                        this.startTurn()
                    }, 1000)
                }
            }

            setTimeout(recursiveWait, 1000)

        },
        playCard(place){
            if ((this.cur.onDesk[place] === undefined) && (this.cur.hand[this.cardChosen]) &&
                (this.cur.hand[this.cardChosen].price <= this.cur.energyCurrent)) {

                this.cur.onDesk[place] = this.cur.hand[this.cardChosen]
                this.cur.energyCurrent -= this.cur.hand[this.cardChosen].price
                // ability
                this.cur.hand[this.cardChosen].ability(place)

                this.cur.hand[this.cardChosen] = undefined
                this.CardChosen = undefined



            }
        },
        choseCard(place){
            if (this.cur.hand[place])  {this.cardChosen = place}
        },
        endTurn(){ // КОнец хода после нажатия кнопки (ИГРОК)
            //    Фаза атаки
            this.attackPhase()

            // Передача хода
            this.player.energyLimit ++
            this.pcTurn()
        },
        startTurn(){ //Ход игрока
            // Добавить одну карту, если колода не пуста и в руке есть место
            this.cur = this.player
            this.addCardToHand()

            this.cur.energyCurrent = this.cur.energyLimit
            this.$refs.playerTurnSquare.style.background = 'green'
            this.$refs.pcTurnSquare.style.background = '#ce2929'
        },

        addCardToHand(){
            if (this.cur.deck.length) {
                if (this.cur.hand.indexOf(undefined) !== -1) {
                    this.cur.hand[this.cur.hand.indexOf(undefined)] = this.cur.deck.pop()
                }
            }
        },

        attackPhase(){ //Пока бить можно только напрямую (но в теории несложно сделать и по диагонали-по полю-...
            let enemy
            let cur = this.cur
            if (this.cur === this.player) {
                enemy = this.pc
            }
            else {enemy = this.player}

            for (let cardIdx in cur.onDesk) {
                if (cur.onDesk[cardIdx]) {
                    if (enemy.onDesk[cardIdx]) {
                        enemy.onDesk[cardIdx].defence -= cur.onDesk[cardIdx].attack
                        if (enemy.onDesk[cardIdx].defence <= 0) {
                            enemy.onDesk[cardIdx] = undefined
                        }
                    }
                    else {
                        enemy.life -= cur.onDesk[cardIdx].attack
                        if (enemy.life <= 0) {
                            let you
                            if (enemy === this.player) {you = 'ПК'}
                            else {you = 'Ты'}
                            alert(you + ' победил! Обнови страницу, чтоб сыграть еще раз.')
                            this.cur = undefined
                            break

                        }
                    }
                }

            }
        }

    },
    beforeMount() {
        this.cardModal = this._cardsList[0]
    },
    mounted() {
        this.startGame()
    }
}
Vue.createApp(App).mount('#app')