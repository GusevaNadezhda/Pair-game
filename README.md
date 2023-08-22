# Pair-game
Игра в пары. 

Разработана простая игра в пары. Игрок видит квадратное поле из карточек, расположенных рубашкой вверх, и находит пары, открывая карточки в произвольном порядке. 
На странице с помощью HTML-элементов выводится поле 4 × 4 из квадратных карточек. Каждая карточка содержит картинку. На поле строго по две карточки с одинаковой 
картинкой, чтобы они могли образовать пару. Карточки расположены в случайном порядке. 

Ход игры. Игрок может нажать на любую карточку. После нажатия карточка открывается — появляется картинка (карточка переворачивается с помощью класса 'open'). 
Далее игрок может открыть вторую карточку. Если открытые карточки содержат одинаковую картинку, они остаются открытыми до конца игры. 
Если вторая карточка содержит отличную от первой картинку, обе карточки закрываются, как только игрок откроет новую карточку. 
На поле остаются открытыми только найденные пары и 1-2 карточки, которые открывает игрок.

Конец игры. Как только игрок открыл все пары на поле, игра считается завершённой. 
Под полем с открытыми карточками появляется кнопка «Сыграть ещё раз», 
при нажатии на которую игра сбрасывается до начального состояния с заново перемешанными карточками.

Для контоля за временем используется таймер с помощью функции setInterval
