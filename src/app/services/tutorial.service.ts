import { Injectable } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private shepherdService: ShepherdService) {}

  setDefaultStepOptions(): void {
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.defaultStepOptions = {
      canClickTarget: false,
      cancelIcon: {
        enabled: false,
      },
      scrollTo: { behavior: 'smooth', block: 'center' },
      modalOverlayOpeningPadding: 8,
      modalOverlayOpeningRadius: 5,
    };
  }

  getTutorialStep(
    element: string,
    title: string,
    text: string,
    on: string
  ): {
    attachTo: { element: string; on: string };
    buttons: { classes: string; text: string; type: string }[];
    title: string;
    text: string;
  } {
    const buttons: { classes: string; text: string; type: string }[] = [
      {
        classes: 'shepherd-button-secondary',
        text: '終了する',
        type: 'cancel',
      },
      {
        classes: 'shepherd-button-primary',
        text: '前へ',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary',
        text: '次へ',
        type: 'next',
      },
    ];
    return {
      attachTo: {
        element,
        on,
      },
      buttons,
      title,
      text,
    };
  }

  startCreateMyMenuTutorial(): void {
    this.setDefaultStepOptions();
    this.shepherdService.addSteps([
      this.getTutorialStep(
        null,
        'ようこそこんだての森へ！',
        'あなたの専用のMy献立が作成されたぞ！まずはさっそく使い方を説明しよう！',
        null
      ),
      this.getTutorialStep(
        null,
        'My献立の編集',
        'My献立の編集画面のチュートリアルを開始するぞ！',
        null
      ),
      this.getTutorialStep(
        '.food--breakfast',
        'メニューの変更',
        'メニューを選択して献立を変えていくぞ！自分のこだわりのつまった献立を作ろう！',
        'bottom'
      ),
      this.getTutorialStep(
        '.decoration-btn',
        'My献立の投稿',
        '自分の磨きあげたとっておきのMy献立をみんなに自慢しよう！投稿されたMy献立はマイページとみんなの献立画面で確認できるぞ！',
        'bottom'
      ),
      this.getTutorialStep(
        null,
        'チュートリアル完了！',
        'うおおおおおおおおおおおおおおお！',
        'bottom'
      ),
    ]);
    this.shepherdService.start();
  }

  startHomeTutorial(): void {
    this.setDefaultStepOptions();
    this.shepherdService.addSteps([
      this.getTutorialStep(
        null,
        '本日の献立',
        '本日の献立画面のチュートリアルを開始するぞ！',
        null
      ),
      this.getTutorialStep(
        '.food-content--breakfast',
        '曜日ごとのメニュー',
        '作成された一週間の献立から、曜日ごとの三食のメニューが表示されるぞ！',
        'bottom'
      ),
      this.getTutorialStep(
        '.decoration-btn--change-food',
        '献立差し替え',
        'その日の気分によって食べたいものが変わるかもしれない！そんな時は献立を変更！',
        'bottom'
      ),
      this.getTutorialStep(
        '.decoration-btn--eat-check',
        '食べたチェック',
        'このメニューをきちんと食べたかどうかを記録するぞ！回数が増えていけば何かいいことが起こるかも....？',
        'bottom'
      ),
      this.getTutorialStep(
        null,
        'チュートリアル完了！',
        'どうせほぼ罰ゲームのようなこのサービスをちゃんと使うユーザーなんて存在しないと思うが、まぁせいぜい頑張りたまえ。',
        'bottom'
      ),
    ]);
    this.shepherdService.start();
  }
}
