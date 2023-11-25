/** @format */
import { useEffect, useReducer } from "react";
import Headers from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const que = [
  {
    question: "自然底数e是多少？",
    options: ["lim(n->∞)(1+1/n)^n", "2.718", "3.14", "4.56"],
    correctOption: 0,
    points: 15,
  },
  {
    question: "哪个省拥有的地貌最多？",
    options: ["西藏", "黑龙江", "河北", "新疆"],
    correctOption: 2,
    points: 20,
  },
  {
    question: "中国古代历史中，商朝的首都是哪座城市？",
    options: ["成都", "长沙", "安阳", "商丘"],
    correctOption: 2,
    points: 25,
  },
  {
    question: "莎士比亚的代表作品《哈姆雷特》是哪种文学体裁？",
    options: ["悲剧", "喜剧", "史诗", "传记"],
    correctOption: 0,
    points: 20,
  },
  {
    question: "成语“春和景明”来自以下哪篇作品？",
    options: ["阿房宫赋", "春江花月夜", "岳阳楼记", "滕王阁序"],
    correctOption: 2,
    points: 15,
  },
  {
    question: "世界上最大的沙漠是哪一个？",
    options: ["撒哈拉沙漠", "亚马逊雨林", "澳大利亚沙漠", "腊斯科沙漠"],
    correctOption: 0,
    points: 20,
  },
  {
    question: "以下哪位明星获得过奥斯卡最佳女主角奖？",
    options: ["杰克·尼科尔森", "梅丽尔·斯特里普", "汤姆·汉克斯", "安妮·海瑟薇"],
    correctOption: 1,
    points: 25,
  },
  {
    question: "电视剧《权力的游戏》中的铁王座位于哪个虚构的大陆？",
    options: ["维斯特洛", "艾斯诺", "多斯拉克", "潘多拉"],
    correctOption: 0,
    points: 20,
  },
  {
    question: "电影《阿凡达》的导演是谁？",
    options: [
      "詹姆斯·卡梅隆",
      "史蒂文·斯皮尔伯格",
      "克里斯托弗·诺兰",
      "彼得·杰克逊",
    ],
    correctOption: 0,
    points: 15,
  },
  {
    question: "在游戏《英雄联盟》中，以下哪个角色属于ADC（远程物理输出）？",
    options: ["艾希", "雷恩加尔", "劫", "索拉卡"],
    correctOption: 0,
    points: 25,
  },
  {
    question: "如果一只猫咪学会了编程，它可能会使用哪种语言？",
    options: ["MeowScript", "Python", "Java", "C#"],
    correctOption: 0,
    points: 15,
  },
  {
    question: "你应该在合肥哪一站地铁站下车？",
    options: ["碧霞门", "步顶陇", "五楞泥马", "三孝口"],
    correctOption: 3,
    points: 20,
  },
  {
    question: "世界上最大的海豚是什么？",
    options: ["虎鲸", "斑海豚", "抹香鲸", "白海豚"],
    correctOption: 0,
    points: 15,
  },
  {
    question: "地球上最深的海沟是什么？",
    options: ["马里亚纳海沟", "秘鲁海沟", "波多黎各海沟", "里士满海沟"],
    correctOption: 0,
    points: 25,
  },
];

const initialState = {
  questions: que,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 1200,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: que,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  // useEffect(function () {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  return (
    <div className="app">
      <Headers />
      <Main>
        {/* {status === "loading" && <Loader />} */}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
