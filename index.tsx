import React from 'react';
import ReactDOM from 'react-dom/client';

const { useState, useCallback, useEffect, useMemo, useRef } = React;

// From services/vocabulary.ts
const vocabularyData = [
    {
        title: "1.1: People and Relationships",
        words: [
            { english: "people", vietnamese: "con người", englishExample: "People in my town are very friendly.", vietnameseExample: "Người trong thị trấn tôi rất thân thiện." },
            { english: "person", vietnamese: "người", englishExample: "She is a kind person.", vietnameseExample: "Cô ấy là một người tốt bụng." },
            { english: "friend", vietnamese: "bạn bè", englishExample: "My best friend sits next to me.", vietnameseExample: "Bạn thân của tôi ngồi cạnh tôi." },
            { english: "classmate", vietnamese: "bạn cùng lớp", englishExample: "My classmate helps me with homework.", vietnameseExample: "Bạn cùng lớp giúp tôi làm bài tập." },
            { english: "neighbor", vietnamese: "hàng xóm", englishExample: "Our neighbor is very nice.", vietnameseExample: "Hàng xóm của chúng tôi rất tốt bụng." },
            { english: "family", vietnamese: "gia đình", englishExample: "I love spending time with my family.", vietnameseExample: "Tôi thích dành thời gian với gia đình." },
            { english: "father", vietnamese: "cha", englishExample: "My father works in a hospital.", vietnameseExample: "Cha tôi làm việc ở bệnh viện." },
            { english: "mother", vietnamese: "mẹ", englishExample: "My mother cooks delicious meals.", vietnameseExample: "Mẹ tôi nấu những bữa ăn ngon." },
            { english: "brother", vietnamese: "anh trai, em trai", englishExample: "My brother likes playing football.", vietnameseExample: "Em trai tôi thích chơi bóng đá." },
            { english: "sister", vietnamese: "chị gái, em gái", englishExample: "My sister studies very hard.", vietnameseExample: "Chị gái tôi học rất chăm chỉ." },
            { english: "cousin", vietnamese: "anh/chị/em họ", englishExample: "My cousin lives in another city.", vietnameseExample: "Anh họ tôi sống ở một thành phố khác." },
            { english: "teacher", vietnamese: "giáo viên", englishExample: "My teacher is always helpful.", vietnameseExample: "Giáo viên của tôi luôn giúp đỡ học sinh." },
            { english: "student", vietnamese: "học sinh", englishExample: "Every student has a notebook.", vietnameseExample: "Mỗi học sinh đều có một quyển vở." },
            { english: "coach", vietnamese: "huấn luyện viên", englishExample: "The coach trains the football team.", vietnameseExample: "Huấn luyện viên huấn luyện đội bóng." },
            { english: "team", vietnamese: "đội, nhóm", englishExample: "Our team practices every afternoon.", vietnameseExample: "Đội của chúng tôi luyện tập mỗi chiều." },
            { english: "player", vietnamese: "người chơi", englishExample: "Each player has a different number.", vietnameseExample: "Mỗi người chơi có một số khác nhau." },
            { english: "pen friend", vietnamese: "bạn qua thư", englishExample: "I have a pen friend from Japan.", vietnameseExample: "Tôi có một người bạn qua thư ở Nhật Bản." },
            { english: "yourself", vietnamese: "bản thân bạn", englishExample: "Believe in yourself.", vietnameseExample: "Hãy tin vào bản thân bạn." },
            { english: "myself", vietnamese: "bản thân tôi", englishExample: "I taught myself to play the guitar.", vietnameseExample: "Tôi tự học chơi đàn guitar." }
        ]
    },
    {
        title: "1.2: Jobs and Roles",
        words: [
            { english: "teacher", vietnamese: "giáo viên", englishExample: "The teacher explains the lesson clearly.", vietnameseExample: "Giáo viên giảng bài rất rõ ràng." },
            { english: "student", vietnamese: "học sinh", englishExample: "Each student has a different hobby.", vietnameseExample: "Mỗi học sinh có một sở thích khác nhau." },
            { english: "nurse", vietnamese: "y tá", englishExample: "The nurse takes care of sick people.", vietnameseExample: "Y tá chăm sóc người bệnh." },
            { english: "doctor", vietnamese: "bác sĩ", englishExample: "The doctor works in a big hospital.", vietnameseExample: "Bác sĩ làm việc trong một bệnh viện lớn." },
            { english: "dentist", vietnamese: "nha sĩ", englishExample: "The dentist checks my teeth twice a year.", vietnameseExample: "Nha sĩ kiểm tra răng của tôi hai lần một năm." },
            { english: "coach", vietnamese: "huấn luyện viên", englishExample: "The coach helps players train hard.", vietnameseExample: "Huấn luyện viên giúp các cầu thủ luyện tập chăm chỉ." },
            { english: "player", vietnamese: "người chơi", englishExample: "The player scores a goal for the team.", vietnameseExample: "Cầu thủ ghi bàn cho đội." },
            { english: "head teacher", vietnamese: "hiệu trưởng", englishExample: "The head teacher is kind to all students.", vietnameseExample: "Hiệu trưởng rất tốt với tất cả học sinh." },
            { english: "volunteer", vietnamese: "tình nguyện viên", englishExample: "Volunteers clean the school yard every week.", vietnameseExample: "Các tình nguyện viên dọn sân trường mỗi tuần." },
            { english: "neighbor", vietnamese: "hàng xóm", englishExample: "My neighbor is a doctor.", vietnameseExample: "Hàng xóm của tôi là một bác sĩ." },
            { english: "classmate", vietnamese: "bạn cùng lớp", englishExample: "My classmate wants to be a teacher.", vietnameseExample: "Bạn cùng lớp tôi muốn trở thành giáo viên." },
            { english: "father", vietnamese: "cha", englishExample: "My father is a bus driver.", vietnameseExample: "Cha tôi là tài xế xe buýt." },
            { english: "mother", vietnamese: "mẹ", englishExample: "My mother is a nurse.", vietnameseExample: "Mẹ tôi là y tá." },
            { english: "brother", vietnamese: "anh trai / em trai", englishExample: "My brother is a football player.", vietnameseExample: "Anh trai tôi là cầu thủ bóng đá." },
            { english: "sister", vietnamese: "chị gái / em gái", englishExample: "My sister wants to be a doctor.", vietnameseExample: "Em gái tôi muốn trở thành bác sĩ." },
            { english: "cousin", vietnamese: "anh/chị/em họ", englishExample: "My cousin is a talented artist.", vietnameseExample: "Anh họ tôi là một nghệ sĩ tài năng." },
            { english: "worker", vietnamese: "công nhân", englishExample: "My uncle is a factory worker.", vietnameseExample: "Chú tôi là công nhân nhà máy." },
            { english: "farmer", vietnamese: "nông dân", englishExample: "Farmers work hard in the field.", vietnameseExample: "Những người nông dân làm việc chăm chỉ trên cánh đồng." },
            { english: "cook", vietnamese: "đầu bếp", englishExample: "The cook prepares delicious food.", vietnameseExample: "Đầu bếp chuẩn bị món ăn ngon." },
            { english: "driver", vietnamese: "tài xế", englishExample: "The driver drives students to school safely.", vietnameseExample: "Tài xế đưa học sinh đến trường an toàn." }
        ]
    },
    {
        title: "1.3: Appearance",
        words: [
            { english: "tall", vietnamese: "cao", englishExample: "My brother is taller than me.", vietnameseExample: "Anh trai tôi cao hơn tôi." },
            { english: "short", vietnamese: "thấp", englishExample: "She is short but very strong.", vietnameseExample: "Cô ấy thấp nhưng rất khỏe." },
            { english: "slim", vietnamese: "mảnh khảnh", englishExample: "The girl is slim and graceful.", vietnameseExample: "Cô gái ấy mảnh khảnh và duyên dáng." },
            { english: "fat", vietnamese: "béo", englishExample: "The cat is fat and cute.", vietnameseExample: "Con mèo béo và dễ thương." },
            { english: "beautiful", vietnamese: "đẹp", englishExample: "Her mother is very beautiful.", vietnameseExample: "Mẹ của cô ấy rất đẹp." },
            { english: "handsome", vietnamese: "đẹp trai", englishExample: "The actor is tall and handsome.", vietnameseExample: "Nam diễn viên cao và đẹp trai." },
            { english: "good-looking", vietnamese: "ưa nhìn", englishExample: "He is a good-looking young man.", vietnameseExample: "Anh ấy là một chàng trai ưa nhìn." },
            { english: "young", vietnamese: "trẻ", englishExample: "The teacher is young and kind.", vietnameseExample: "Cô giáo còn trẻ và tốt bụng." },
            { english: "old", vietnamese: "già", englishExample: "My grandfather is old but healthy.", vietnameseExample: "Ông tôi đã già nhưng vẫn khỏe mạnh." },
            { english: "dark hair", vietnamese: "tóc đen", englishExample: "She has long dark hair.", vietnameseExample: "Cô ấy có mái tóc đen dài." },
            { english: "fair hair", vietnamese: "tóc sáng màu", englishExample: "My friend has short fair hair.", vietnameseExample: "Bạn tôi có mái tóc sáng màu và ngắn." },
            { english: "curly hair", vietnamese: "tóc xoăn", englishExample: "Her curly hair looks beautiful.", vietnameseExample: "Tóc xoăn của cô ấy trông rất đẹp." },
            { english: "straight hair", vietnamese: "tóc thẳng", englishExample: "I like her straight hair.", vietnameseExample: "Tôi thích mái tóc thẳng của cô ấy." },
            { english: "long hair", vietnamese: "tóc dài", englishExample: "My sister has very long hair.", vietnameseExample: "Chị tôi có mái tóc rất dài." },
            { english: "short hair", vietnamese: "tóc ngắn", englishExample: "He has short hair and wears glasses.", vietnameseExample: "Anh ấy tóc ngắn và đeo kính." },
            { english: "wear glasses", vietnamese: "đeo kính", englishExample: "Many students wear glasses.", vietnameseExample: "Nhiều học sinh đeo kính." },
            { english: "eyes", vietnamese: "đôi mắt", englishExample: "She has big brown eyes.", vietnameseExample: "Cô ấy có đôi mắt nâu to." },
            { english: "face", vietnamese: "khuôn mặt", englishExample: "His face looks happy today.", vietnameseExample: "Khuôn mặt của anh ấy trông vui hôm nay." },
            { english: "smile", vietnamese: "nụ cười", englishExample: "Her smile makes everyone happy.", vietnameseExample: "Nụ cười của cô ấy khiến mọi người vui vẻ." },
            { english: "skin", vietnamese: "làn da", englishExample: "He has fair skin and dark eyes.", vietnameseExample: "Anh ấy có làn da sáng và đôi mắt đen." }
        ]
    },
    {
        title: "1.4: Personality and Character",
        words: [
            { english: "kind", vietnamese: "tốt bụng", englishExample: "She is very kind to animals.", vietnameseExample: "Cô ấy rất tốt bụng với động vật." },
            { english: "friendly", vietnamese: "thân thiện", englishExample: "Our teacher is friendly and helpful.", vietnameseExample: "Cô giáo của chúng tôi thân thiện và hay giúp đỡ." },
            { english: "generous", vietnamese: "hào phóng", englishExample: "He is generous and often helps others.", vietnameseExample: "Anh ấy hào phóng và thường giúp đỡ người khác." },
            { english: "helpful", vietnamese: "hay giúp đỡ", englishExample: "My classmate is helpful to everyone.", vietnameseExample: "Bạn cùng lớp tôi rất hay giúp đỡ mọi người." },
            { english: "honest", vietnamese: "trung thực", englishExample: "We should be honest with our friends.", vietnameseExample: "Chúng ta nên trung thực với bạn bè." },
            { english: "funny", vietnamese: "vui tính", englishExample: "My father is funny and makes us laugh.", vietnameseExample: "Bố tôi vui tính và luôn làm chúng tôi cười." },
            { english: "quiet", vietnamese: "trầm lặng", englishExample: "She is quiet but very smart.", vietnameseExample: "Cô ấy trầm lặng nhưng rất thông minh." },
            { english: "noisy", vietnamese: "ồn ào", englishExample: "The boys are noisy during break time.", vietnameseExample: "Các cậu bé rất ồn ào trong giờ ra chơi." },
            { english: "shy", vietnamese: "ngại ngùng", englishExample: "He is too shy to talk to new people.", vietnameseExample: "Cậu ấy quá ngại ngùng để nói chuyện với người lạ." },
            { english: "confident", vietnamese: "tự tin", englishExample: "Be confident when you speak English.", vietnameseExample: "Hãy tự tin khi bạn nói tiếng Anh." },
            { english: "clever", vietnamese: "thông minh", englishExample: "The clever student answered all the questions.", vietnameseExample: "Học sinh thông minh ấy đã trả lời tất cả câu hỏi." },
            { english: "patient", vietnamese: "kiên nhẫn", englishExample: "Teachers must be patient with students.", vietnameseExample: "Giáo viên phải kiên nhẫn với học sinh." },
            { english: "lazy", vietnamese: "lười biếng", englishExample: "Don't be lazy, finish your homework!", vietnameseExample: "Đừng lười biếng, hãy làm xong bài tập đi!" },
            { english: "hard-working", vietnamese: "chăm chỉ", englishExample: "She is a hard-working student.", vietnameseExample: "Cô ấy là một học sinh chăm chỉ." },
            { english: "polite", vietnamese: "lịch sự", englishExample: "We should be polite to older people.", vietnameseExample: "Chúng ta nên lịch sự với người lớn tuổi." },
            { english: "impolite", vietnamese: "bất lịch sự", englishExample: "It's impolite to talk loudly in class.", vietnameseExample: "Nói to trong lớp là bất lịch sự." },
            { english: "tidy", vietnamese: "gọn gàng", englishExample: "His desk is always tidy.", vietnameseExample: "Bàn học của cậu ấy lúc nào cũng gọn gàng." },
            { english: "messy", vietnamese: "bừa bộn", englishExample: "My room is messy after the party.", vietnameseExample: "Phòng tôi bừa bộn sau bữa tiệc." },
            { english: "creative", vietnamese: "sáng tạo", englishExample: "She is very creative in art class.", vietnameseExample: "Cô ấy rất sáng tạo trong giờ mỹ thuật." },
            { english: "boring", vietnamese: "nhàm chán", englishExample: "He is not boring, he's very interesting!", vietnameseExample: "Cậu ấy không hề nhàm chán, mà rất thú vị!" }
        ]
    },
    {
        title: "1.5: Feelings and Emotions",
        words: [
            { english: "happy", vietnamese: "vui vẻ", englishExample: "I feel happy when I play with my friends.", vietnameseExample: "Tôi cảm thấy vui khi chơi với bạn bè." },
            { english: "sad", vietnamese: "buồn", englishExample: "She is sad because she lost her pen.", vietnameseExample: "Cô ấy buồn vì làm mất cây bút." },
            { english: "excited", vietnamese: "háo hức", englishExample: "We are excited about the school trip.", vietnameseExample: "Chúng tôi háo hức về chuyến đi của trường." },
            { english: "worried", vietnamese: "lo lắng", englishExample: "He is worried about the test tomorrow.", vietnameseExample: "Cậu ấy lo lắng về bài kiểm tra ngày mai." },
            { english: "surprised", vietnamese: "ngạc nhiên", englishExample: "I was surprised by my birthday gift.", vietnameseExample: "Tôi ngạc nhiên với món quà sinh nhật." },
            { english: "angry", vietnamese: "tức giận", englishExample: "My mom is angry because I broke the glass.", vietnameseExample: "Mẹ tôi tức giận vì tôi làm vỡ cái ly." },
            { english: "tired", vietnamese: "mệt mỏi", englishExample: "I feel tired after playing football.", vietnameseExample: "Tôi cảm thấy mệt sau khi chơi bóng." },
            { english: "relaxed", vietnamese: "thư giãn", englishExample: "Listening to music makes me relaxed.", vietnameseExample: "Nghe nhạc khiến tôi cảm thấy thư giãn." },
            { english: "scared", vietnamese: "sợ hãi", englishExample: "The little boy is scared of the dark.", vietnameseExample: "Cậu bé sợ bóng tối." },
            { english: "calm", vietnamese: "điềm tĩnh", englishExample: "Stay calm when you have a problem.", vietnameseExample: "Hãy giữ bình tĩnh khi gặp vấn đề." },
            { english: "nervous", vietnamese: "lo lắng", englishExample: "She feels nervous before the exam.", vietnameseExample: "Cô ấy cảm thấy lo lắng trước kỳ thi." },
            { english: "confident", vietnamese: "tự tin", englishExample: "He looks confident on stage.", vietnameseExample: "Cậu ấy trông rất tự tin trên sân khấu." },
            { english: "shy", vietnamese: "ngại ngùng", englishExample: "Don't be shy, just say hello!", vietnameseExample: "Đừng ngại, hãy nói xin chào đi!" },
            { english: "interested in", vietnamese: "quan tâm đến", englishExample: "I'm interested in learning English.", vietnameseExample: "Tôi quan tâm đến việc học tiếng Anh." },
            { english: "bored", vietnamese: "chán", englishExample: "I feel bored when I have nothing to do.", vietnameseExample: "Tôi cảm thấy chán khi không có gì làm." },
            { english: "angry with", vietnamese: "tức giận với", englishExample: "She is angry with her brother.", vietnameseExample: "Cô ấy tức giận với em trai mình." }
        ]
    },
    {
        title: "1.6: Actions and Descriptions",
        words: [
            { english: "feel", vietnamese: "cảm thấy", englishExample: "I feel better after taking a rest.", vietnameseExample: "Tôi cảm thấy khỏe hơn sau khi nghỉ ngơi." },
            { english: "seem", vietnamese: "có vẻ như", englishExample: "He seems tired today.", vietnameseExample: "Hôm nay cậu ấy có vẻ mệt." },
            { english: "look", vietnamese: "trông có vẻ", englishExample: "You look happy this morning.", vietnameseExample: "Sáng nay bạn trông thật vui vẻ." },
            { english: "smile", vietnamese: "cười, nụ cười", englishExample: "Her smile makes me happy.", vietnameseExample: "Nụ cười của cô ấy khiến tôi vui vẻ." },
            { english: "laugh", vietnamese: "cười lớn", englishExample: "They laugh a lot during the funny movie.", vietnameseExample: "Họ cười lớn khi xem bộ phim hài." },
            { english: "cry", vietnamese: "khóc", englishExample: "The baby cries when he is hungry.", vietnameseExample: "Em bé khóc khi đói." },
            { english: "describe", vietnamese: "miêu tả", englishExample: "Can you describe your best friend?", vietnameseExample: "Bạn có thể miêu tả người bạn thân của mình không?" },
            { english: "think", vietnamese: "nghĩ", englishExample: "I think this book is interesting.", vietnameseExample: "Tôi nghĩ cuốn sách này rất thú vị." },
            { english: "agree", vietnamese: "đồng ý", englishExample: "I agree with your idea.", vietnameseExample: "Tôi đồng ý với ý kiến của bạn." },
            { english: "disagree", vietnamese: "không đồng ý", englishExample: "I disagree with that opinion.", vietnameseExample: "Tôi không đồng ý với ý kiến đó." },
            { english: "prefer", vietnamese: "thích hơn", englishExample: "I prefer tea to coffee.", vietnameseExample: "Tôi thích trà hơn cà phê." },
            { english: "feel confident", vietnamese: "cảm thấy tự tin", englishExample: "I feel confident when I speak English.", vietnameseExample: "Tôi cảm thấy tự tin khi nói tiếng Anh." },
            { english: "feel nervous", vietnamese: "cảm thấy lo lắng", englishExample: "He feels nervous before his presentation.", vietnameseExample: "Cậu ấy cảm thấy lo lắng trước bài thuyết trình." },
            { english: "look like", vietnamese: "trông giống như", englishExample: "You look like your mother.", vietnameseExample: "Bạn trông giống mẹ bạn." },
            { english: "character", vietnamese: "đặc điểm, tính cách", englishExample: "His character is very kind.", vietnameseExample: "Tính cách của anh ấy rất tốt bụng." },
            { english: "personality", vietnamese: "tính cách", englishExample: "Everyone likes her friendly personality.", vietnameseExample: "Mọi người đều thích tính cách thân thiện của cô ấy." },
            { english: "opinion", vietnamese: "ý kiến", englishExample: "What's your opinion about this story?", vietnameseExample: "Ý kiến của bạn về câu chuyện này là gì?" },
            { english: "talk", vietnamese: "nói chuyện", englishExample: "We talk about our weekend plans.", vietnameseExample: "Chúng tôi nói về kế hoạch cuối tuần." },
            { english: "listen", vietnamese: "lắng nghe", englishExample: "Always listen carefully in class.", vietnameseExample: "Luôn lắng nghe cẩn thận trong lớp học." },
            { english: "speak", vietnamese: "nói", englishExample: "She can speak English very well.", vietnameseExample: "Cô ấy có thể nói tiếng Anh rất tốt." }
        ]
    },
    {
        title: "2.1: School and Classroom",
        words: [
            { english: "school", vietnamese: "trường học", englishExample: "Our school is big and beautiful.", vietnameseExample: "Trường của chúng tôi lớn và đẹp." },
            { english: "classroom", vietnamese: "phòng học", englishExample: "There are twenty desks in our classroom.", vietnameseExample: "Có hai mươi bàn học trong lớp của chúng tôi." },
            { english: "class", vietnamese: "lớp học", englishExample: "Our class has thirty students.", vietnameseExample: "Lớp của chúng tôi có ba mươi học sinh." },
            { english: "teacher", vietnamese: "giáo viên", englishExample: "The teacher writes on the board.", vietnameseExample: "Cô giáo viết lên bảng." },
            { english: "student", vietnamese: "học sinh", englishExample: "Each student has a book.", vietnameseExample: "Mỗi học sinh có một quyển sách." },
            { english: "pupil", vietnamese: "học sinh (Anh Anh)", englishExample: "The pupils are reading quietly.", vietnameseExample: "Các học sinh đang đọc sách một cách yên lặng." },
            { english: "subject", vietnamese: "môn học", englishExample: "English is my favorite subject.", vietnameseExample: "Tiếng Anh là môn học yêu thích của tôi." },
            { english: "lesson", vietnamese: "bài học", englishExample: "Today's lesson is about animals.", vietnameseExample: "Bài học hôm nay nói về các loài động vật." },
            { english: "timetable", vietnamese: "thời khóa biểu", englishExample: "I have five subjects on my timetable.", vietnameseExample: "Tôi có năm môn học trong thời khóa biểu." },
            { english: "homework", vietnamese: "bài tập về nhà", englishExample: "I always do my homework after dinner.", vietnameseExample: "Tôi luôn làm bài tập về nhà sau bữa tối." },
            { english: "test", vietnamese: "bài kiểm tra", englishExample: "We have an English test tomorrow.", vietnameseExample: "Ngày mai chúng tôi có bài kiểm tra tiếng Anh." },
            { english: "exam", vietnamese: "kỳ thi", englishExample: "She studies hard for the final exam.", vietnameseExample: "Cô ấy học chăm chỉ cho kỳ thi cuối kỳ." },
            { english: "mark", vietnamese: "điểm số", englishExample: "I got a high mark in English.", vietnameseExample: "Tôi đạt điểm cao môn tiếng Anh." },
            { english: "grade", vietnamese: "xếp loại", englishExample: "He is in grade seven.", vietnameseExample: "Cậu ấy học lớp bảy." },
            { english: "desk", vietnamese: "bàn học", englishExample: "I keep my books on the desk.", vietnameseExample: "Tôi để sách trên bàn học." },
            { english: "board", vietnamese: "bảng", englishExample: "The teacher is writing on the board.", vietnameseExample: "Cô giáo đang viết lên bảng." },
            { english: "chair", vietnamese: "ghế", englishExample: "Each student has a chair.", vietnameseExample: "Mỗi học sinh có một cái ghế." },
            { english: "school bag", vietnamese: "cặp đi học", englishExample: "I carry my books in my school bag.", vietnameseExample: "Tôi mang sách trong cặp đi học." },
            { english: "uniform", vietnamese: "đồng phục", englishExample: "We wear a school uniform every day.", vietnameseExample: "Chúng tôi mặc đồng phục mỗi ngày." },
            { english: "library", vietnamese: "thư viện", englishExample: "The library is full of interesting books.", vietnameseExample: "Thư viện có nhiều sách hay." }
        ]
    },
    {
        title: "2.2: Studying and Testing",
        words: [
            { english: "study", vietnamese: "học tập", englishExample: "I study English every day.", vietnameseExample: "Tôi học tiếng Anh mỗi ngày." },
            { english: "learn", vietnamese: "học", englishExample: "We learn new words in class.", vietnameseExample: "Chúng tôi học những từ mới trong lớp." },
            { english: "revise", vietnamese: "ôn tập", englishExample: "I revise my lessons before exams.", vietnameseExample: "Tôi ôn lại bài trước kỳ thi." },
            { english: "practice", vietnamese: "luyện tập", englishExample: "She practices speaking English with her friends.", vietnameseExample: "Cô ấy luyện nói tiếng Anh với bạn bè." },
            { english: "question", vietnamese: "câu hỏi", englishExample: "The teacher asked me a question.", vietnameseExample: "Cô giáo hỏi tôi một câu hỏi." },
            { english: "answer", vietnamese: "câu trả lời", englishExample: "I gave the correct answer.", vietnameseExample: "Tôi đã đưa ra câu trả lời đúng." },
            { english: "mistake", vietnamese: "lỗi sai", englishExample: "Check your mistakes carefully.", vietnameseExample: "Hãy kiểm tra kỹ lỗi sai của bạn." },
            { english: "correct", vietnamese: "sửa đúng", englishExample: "Please correct your answers.", vietnameseExample: "Hãy sửa lại các câu trả lời của em." },
            { english: "explain", vietnamese: "giải thích", englishExample: "The teacher explains the new words.", vietnameseExample: "Cô giáo giải thích những từ mới." },
            { english: "understand", vietnamese: "hiểu", englishExample: "I don't understand this question.", vietnameseExample: "Tôi không hiểu câu hỏi này." },
            { english: "remember", vietnamese: "ghi nhớ", englishExample: "It's hard to remember all the words.", vietnameseExample: "Rất khó để nhớ hết các từ." },
            { english: "forget", vietnamese: "quên", englishExample: "Don't forget to do your homework!", vietnameseExample: "Đừng quên làm bài tập về nhà nhé!" },
            { english: "think", vietnamese: "nghĩ", englishExample: "Think carefully before you answer.", vietnameseExample: "Hãy suy nghĩ kỹ trước khi trả lời." },
            { english: "know", vietnamese: "biết", englishExample: "Do you know the right answer?", vietnameseExample: "Bạn có biết câu trả lời đúng không?" },
            { english: "check", vietnamese: "kiểm tra", englishExample: "Check your test before you hand it in.", vietnameseExample: "Hãy kiểm tra bài trước khi nộp." },
            { english: "underline", vietnamese: "gạch dưới", englishExample: "Please underline the key words.", vietnameseExample: "Hãy gạch dưới các từ quan trọng." },
            { english: "fill in", vietnamese: "điền vào", englishExample: "Fill in the blanks with the correct words.", vietnameseExample: "Điền vào chỗ trống bằng từ đúng." },
            { english: "choose", vietnamese: "chọn", englishExample: "Choose the best answer.", vietnameseExample: "Chọn câu trả lời đúng nhất." },
            { english: "complete", vietnamese: "hoàn thành", englishExample: "Complete the sentences with verbs.", vietnameseExample: "Hoàn thành các câu với động từ." },
            { english: "match", vietnamese: "nối / ghép", englishExample: "Match the words with their meanings.", vietnameseExample: "Hãy nối các từ với nghĩa của chúng." }
        ]
    },
    {
        title: "2.3: Grammar and Language Skills",
        words: [
            { english: "grammar", vietnamese: "ngữ pháp", englishExample: "English grammar is not very hard.", vietnameseExample: "Ngữ pháp tiếng Anh không quá khó." },
            { english: "vocabulary", vietnamese: "từ vựng", englishExample: "I learn ten new words every day.", vietnameseExample: "Tôi học mười từ mới mỗi ngày." },
            { english: "pronunciation", vietnamese: "phát âm", englishExample: "Good pronunciation helps people understand you.", vietnameseExample: "Phát âm tốt giúp người khác hiểu bạn." },
            { english: "stress", vietnamese: "trọng âm", englishExample: "The stress is on the first syllable.", vietnameseExample: "Trọng âm nằm ở âm tiết đầu tiên." },
            { english: "intonation", vietnamese: "ngữ điệu", englishExample: "English intonation sounds musical.", vietnameseExample: "Ngữ điệu tiếng Anh nghe như có nhạc." },
            { english: "sentence", vietnamese: "câu", englishExample: "Write a sentence using this word.", vietnameseExample: "Hãy viết một câu dùng từ này." },
            { english: "phrase", vietnamese: "cụm từ", englishExample: "Learn useful English phrases.", vietnameseExample: "Học những cụm từ tiếng Anh hữu ích." },
            { english: "clause", vietnamese: "mệnh đề", englishExample: "This sentence has two clauses.", vietnameseExample: "Câu này có hai mệnh đề." },
            { english: "noun", vietnamese: "danh từ", englishExample: "'Dog' is a common noun.", vietnameseExample: "“Dog” là một danh từ phổ biến." },
            { english: "verb", vietnamese: "động từ", englishExample: "'Run' and 'jump' are verbs.", vietnameseExample: "“Run” và “jump” là động từ." },
            { english: "adjective", vietnamese: "tính từ", englishExample: "'Beautiful' is an adjective.", vietnameseExample: "“Beautiful” là một tính từ." },
            { english: "adverb", vietnamese: "trạng từ", englishExample: "She sings beautifully.", vietnameseExample: "Cô ấy hát rất hay." },
            { english: "preposition", vietnamese: "giới từ", englishExample: "'On' and 'under' are prepositions.", vietnameseExample: "“On” và “under” là các giới từ." },
            { english: "conjunction", vietnamese: "liên từ", englishExample: "'And' is a common conjunction.", vietnameseExample: "“And” là một liên từ phổ biến." },
            { english: "article", vietnamese: "mạo từ", englishExample: "We use 'a' before a consonant sound.", vietnameseExample: "Ta dùng “a” trước âm phụ âm." },
            { english: "tense", vietnamese: "thì", englishExample: "We are learning the present tense.", vietnameseExample: "Chúng tôi đang học thì hiện tại." },
            { english: "present simple", vietnamese: "thì hiện tại đơn", englishExample: "I go to school every day.", vietnameseExample: "Tôi đi học mỗi ngày." },
            { english: "past simple", vietnamese: "thì quá khứ đơn", englishExample: "She visited her grandma yesterday.", vietnameseExample: "Cô ấy thăm bà của mình hôm qua." },
            { english: "future simple", vietnamese: "thì tương lai đơn", englishExample: "We will have an exam next week.", vietnameseExample: "Tuần tới chúng tôi sẽ có kỳ thi." },
            { english: "modal verb", vietnamese: "động từ khuyết thiếu", englishExample: "'Can' and 'must' are modal verbs.", vietnameseExample: "“Can” và “must” là các động từ khuyết thiếu." }
        ]
    },
    {
        title: "2.4: School Activities and Projects",
        words: [
            { english: "report", vietnamese: "báo cáo", englishExample: "I wrote a report about my school trip.", vietnameseExample: "Tôi đã viết một báo cáo về chuyến đi của trường." },
            { english: "presentation", vietnamese: "bài thuyết trình", englishExample: "We have a presentation about the environment.", vietnameseExample: "Chúng tôi có một bài thuyết trình về môi trường." },
            { english: "discussion", vietnamese: "cuộc thảo luận", englishExample: "Let's have a class discussion about the topic.", vietnameseExample: "Hãy cùng thảo luận trong lớp về chủ đề này." },
            { english: "group", vietnamese: "nhóm", englishExample: "We are working in a small group.", vietnameseExample: "Chúng tôi đang làm việc trong một nhóm nhỏ." },
            { english: "pair work", vietnamese: "làm việc theo cặp", englishExample: "The students do pair work in English class.", vietnameseExample: "Học sinh làm việc theo cặp trong giờ tiếng Anh." },
            { english: "project", vietnamese: "dự án", englishExample: "Our project is about healthy food.", vietnameseExample: "Dự án của chúng tôi nói về thực phẩm lành mạnh." },
            { english: "competition", vietnamese: "cuộc thi", englishExample: "There is a spelling competition next week.", vietnameseExample: "Tuần sau có một cuộc thi đánh vần." },
            { english: "prize", vietnamese: "phần thưởng", englishExample: "The winner will get a nice prize.", vietnameseExample: "Người chiến thắng sẽ nhận được phần thưởng đẹp." },
            { english: "certificate", vietnamese: "giấy chứng nhận", englishExample: "I received a certificate for good results.", vietnameseExample: "Tôi nhận được giấy chứng nhận vì kết quả tốt." },
            { english: "effort", vietnamese: "nỗ lực", englishExample: "With effort, you can improve your English.", vietnameseExample: "Với nỗ lực, bạn có thể cải thiện tiếng Anh." },
            { english: "improve", vietnamese: "cải thiện", englishExample: "Reading books helps me improve my writing.", vietnameseExample: "Đọc sách giúp tôi cải thiện kỹ năng viết." },
            { english: "develop", vietnamese: "phát triển", englishExample: "We should develop good study habits.", vietnameseExample: "Chúng ta nên phát triển thói quen học tốt." },
            { english: "achieve", vietnamese: "đạt được", englishExample: "She achieved her goal of learning English.", vietnameseExample: "Cô ấy đã đạt được mục tiêu học tiếng Anh." },
            { english: "succeed", vietnamese: "thành công", englishExample: "You can succeed if you work hard.", vietnameseExample: "Bạn có thể thành công nếu bạn chăm chỉ." },
            { english: "failure", vietnamese: "thất bại", englishExample: "Don't be sad about your failure.", vietnameseExample: "Đừng buồn vì thất bại của bạn." },
            { english: "try", vietnamese: "cố gắng", englishExample: "Always try your best in every lesson.", vietnameseExample: "Luôn cố gắng hết sức trong mỗi bài học." },
            { english: "pay attention", vietnamese: "chú ý", englishExample: "Pay attention to the teacher's instructions.", vietnameseExample: "Hãy chú ý đến lời hướng dẫn của cô giáo." },
            { english: "share ideas", vietnamese: "chia sẻ ý tưởng", englishExample: "Students share ideas during group work.", vietnameseExample: "Học sinh chia sẻ ý tưởng trong khi làm việc nhóm." },
            { english: "help each other", vietnamese: "giúp đỡ nhau", englishExample: "We help each other during class projects.", vietnameseExample: "Chúng tôi giúp đỡ nhau trong các dự án lớp." },
            { english: "take part in", vietnamese: "tham gia vào", englishExample: "I take part in the school science fair.", vietnameseExample: "Tôi tham gia hội chợ khoa học của trường." }
        ]
    },
    {
        title: "2.5: Subjects and Education",
        words: [
            { english: "subject", vietnamese: "môn học", englishExample: "My favorite subject is English.", vietnameseExample: "Môn học yêu thích của tôi là tiếng Anh." },
            { english: "mathematics", vietnamese: "toán học", englishExample: "Mathematics helps us think logically.", vietnameseExample: "Toán học giúp chúng ta suy nghĩ logic hơn." },
            { english: "English", vietnamese: "tiếng Anh", englishExample: "We learn English four times a week.", vietnameseExample: "Chúng tôi học tiếng Anh bốn buổi mỗi tuần." },
            { english: "history", vietnamese: "lịch sử", englishExample: "History is an interesting subject.", vietnameseExample: "Lịch sử là một môn học thú vị." },
            { english: "geography", vietnamese: "địa lý", englishExample: "We study countries in geography class.", vietnameseExample: "Chúng tôi học về các quốc gia trong giờ địa lý." },
            { english: "science", vietnamese: "khoa học", englishExample: "Science teaches us about nature.", vietnameseExample: "Môn khoa học dạy chúng tôi về tự nhiên." },
            { english: "biology", vietnamese: "sinh học", englishExample: "In biology, we learn about the human body.", vietnameseExample: "Trong môn sinh học, chúng tôi học về cơ thể người." },
            { english: "physics", vietnamese: "vật lý", englishExample: "Physics explains how things move.", vietnameseExample: "Vật lý giải thích cách mọi vật chuyển động." },
            { english: "chemistry", vietnamese: "hóa học", englishExample: "Chemistry is about substances and reactions.", vietnameseExample: "Hóa học nói về các chất và phản ứng của chúng." },
            { english: "art", vietnamese: "mỹ thuật", englishExample: "We draw and paint in art class.", vietnameseExample: "Chúng tôi vẽ và tô màu trong giờ mỹ thuật." },
            { english: "music", vietnamese: "âm nhạc", englishExample: "I can play the piano in music class.", vietnameseExample: "Tôi có thể chơi đàn piano trong giờ âm nhạc." },
            { english: "information technology (IT)", vietnamese: "tin học", englishExample: "We learn to use computers in IT.", vietnameseExample: "Chúng tôi học sử dụng máy tính trong môn tin học." },
            { english: "physical education (PE)", vietnamese: "thể dục", englishExample: "PE helps students stay healthy.", vietnameseExample: "Môn thể dục giúp học sinh giữ sức khỏe." },
            { english: "literature", vietnamese: "ngữ văn", englishExample: "We read poems in literature class.", vietnameseExample: "Chúng tôi đọc thơ trong giờ ngữ văn." },
            { english: "civics", vietnamese: "giáo dục công dân", englishExample: "Civics teaches us to be good citizens.", vietnameseExample: "Môn giáo dục công dân dạy chúng tôi trở thành công dân tốt." },
            { english: "education", vietnamese: "giáo dục", englishExample: "Education is important for our future.", vietnameseExample: "Giáo dục rất quan trọng cho tương lai của chúng ta." },
            { english: "school rule", vietnamese: "nội quy trường", englishExample: "Students must follow the school rules.", vietnameseExample: "Học sinh phải tuân thủ nội quy của trường." },
            { english: "head teacher", vietnamese: "hiệu trưởng", englishExample: "The head teacher takes care of all students.", vietnameseExample: "Hiệu trưởng quan tâm đến tất cả học sinh." },
            { english: "break time", vietnamese: "giờ ra chơi", englishExample: "We play games during break time.", vietnameseExample: "Chúng tôi chơi trò chơi trong giờ ra chơi." },
            { english: "library", vietnamese: "thư viện", englishExample: "The library is a quiet place to study.", vietnameseExample: "Thư viện là nơi yên tĩnh để học tập." }
        ]
    },
    {
        title: "3.1: Hobbies and Interests",
        words: [
            { english: "hobby", vietnamese: "sở thích", englishExample: "My hobby is collecting stamps.", vietnameseExample: "Sở thích của tôi là sưu tầm tem." },
            { english: "interest", vietnamese: "sự quan tâm", englishExample: "I have an interest in music.", vietnameseExample: "Tôi có sự quan tâm đến âm nhạc." },
            { english: "enjoy", vietnamese: "thích, tận hưởng", englishExample: "I enjoy reading comic books.", vietnameseExample: "Tôi thích đọc truyện tranh." },
            { english: "love", vietnamese: "yêu thích", englishExample: "I love listening to English songs.", vietnameseExample: "Tôi yêu thích nghe nhạc tiếng Anh." },
            { english: "like", vietnamese: "thích", englishExample: "I like playing badminton after school.", vietnameseExample: "Tôi thích chơi cầu lông sau giờ học." },
            { english: "dislike", vietnamese: "không thích", englishExample: "I dislike getting up early.", vietnameseExample: "Tôi không thích dậy sớm." },
            { english: "hate", vietnamese: "ghét", englishExample: "He hates doing homework.", vietnameseExample: "Cậu ấy ghét làm bài tập về nhà." },
            { english: "prefer", vietnamese: "thích hơn", englishExample: "I prefer painting to drawing.", vietnameseExample: "Tôi thích vẽ màu hơn là vẽ chì." },
            { english: "would rather", vietnamese: "muốn hơn, thà rằng", englishExample: "I'd rather play football than stay at home.", vietnameseExample: "Tôi muốn chơi bóng đá hơn là ở nhà." },
            { english: "be interested in", vietnamese: "quan tâm đến", englishExample: "She is interested in photography.", vietnameseExample: "Cô ấy quan tâm đến nhiếp ảnh." },
            { english: "spend time", vietnamese: "dành thời gian", englishExample: "We spend time reading books on weekends.", vietnameseExample: "Chúng tôi dành thời gian đọc sách vào cuối tuần." },
            { english: "in my free time", vietnamese: "vào thời gian rảnh", englishExample: "In my free time, I watch movies.", vietnameseExample: "Vào thời gian rảnh, tôi xem phim." }
        ]
    },
    {
        title: "3.2: Sports and Outdoor Activities",
        words: [
            { english: "play sports", vietnamese: "chơi thể thao", englishExample: "I play sports to keep fit.", vietnameseExample: "Tôi chơi thể thao để giữ dáng." },
            { english: "play football", vietnamese: "chơi bóng đá", englishExample: "We play football after school.", vietnameseExample: "Chúng tôi chơi bóng đá sau giờ học." },
            { english: "play badminton", vietnamese: "chơi cầu lông", englishExample: "She plays badminton with her friends.", vietnameseExample: "Cô ấy chơi cầu lông với bạn bè." },
            { english: "play volleyball", vietnamese: "chơi bóng chuyền", englishExample: "They play volleyball every Sunday.", vietnameseExample: "Họ chơi bóng chuyền mỗi Chủ nhật." },
            { english: "play table tennis", vietnamese: "chơi bóng bàn", englishExample: "My brother plays table tennis at school.", vietnameseExample: "Anh trai tôi chơi bóng bàn ở trường." },
            { english: "go swimming", vietnamese: "đi bơi", englishExample: "I go swimming twice a week.", vietnameseExample: "Tôi đi bơi hai lần mỗi tuần." },
            { english: "go fishing", vietnamese: "đi câu cá", englishExample: "We go fishing in the river near our house.", vietnameseExample: "Chúng tôi đi câu cá ở con sông gần nhà." },
            { english: "go camping", vietnamese: "đi cắm trại", englishExample: "Our class goes camping once a year.", vietnameseExample: "Lớp chúng tôi đi cắm trại mỗi năm một lần." },
            { english: "go cycling", vietnamese: "đi đạp xe", englishExample: "I go cycling in the park every morning.", vietnameseExample: "Tôi đạp xe trong công viên mỗi sáng." },
            { english: "go jogging", vietnamese: "đi/chạy bộ", englishExample: "My father goes jogging after work.", vietnameseExample: "Bố tôi chạy bộ sau giờ làm." },
            { english: "go hiking", vietnamese: "đi bộ đường dài", englishExample: "We go hiking in the mountains.", vietnameseExample: "Chúng tôi đi bộ đường dài trên núi." },
            { english: "go shopping", vietnamese: "đi mua sắm", englishExample: "I go shopping with my mom on weekends.", vietnameseExample: "Tôi đi mua sắm với mẹ vào cuối tuần." },
            { english: "go out", vietnamese: "đi ra ngoài", englishExample: "Let's go out and play!", vietnameseExample: "Hãy đi ra ngoài và chơi nào!" },
            { english: "go on a picnic", vietnamese: "đi dã ngoại", englishExample: "We go on a picnic every summer.", vietnameseExample: "Chúng tôi đi dã ngoại mỗi mùa hè." },
            { english: "play games", vietnamese: "chơi trò chơi", englishExample: "I like to play games with my friends.", vietnameseExample: "Tôi thích chơi trò chơi với bạn bè." },
            { english: "go to the park", vietnamese: "đi công viên", englishExample: "We go to the park to play and relax.", vietnameseExample: "Chúng tôi đi công viên để chơi và thư giãn." },
            { english: "go to the beach", vietnamese: "đi biển", englishExample: "My family goes to the beach in summer.", vietnameseExample: "Gia đình tôi đi biển vào mùa hè." },
            { english: "go to the zoo", vietnamese: "đi sở thú", englishExample: "The children go to the zoo on Sunday.", vietnameseExample: "Các em nhỏ đi sở thú vào Chủ nhật." },
            { english: "hang out with friends", vietnamese: "đi chơi với bạn bè", englishExample: "I often hang out with friends after class.", vietnameseExample: "Tôi thường đi chơi với bạn sau giờ học." }
        ]
    },
    {
        title: "3.3: Indoor and Creative Activities",
        words: [
            { english: "collect stamps", vietnamese: "sưu tầm tem", englishExample: "He collects stamps from many countries.", vietnameseExample: "Cậu ấy sưu tầm tem từ nhiều quốc gia." },
            { english: "collect coins", vietnamese: "sưu tầm tiền xu", englishExample: "My brother collects old coins.", vietnameseExample: "Anh trai tôi sưu tầm tiền xu cổ." },
            { english: "read books", vietnamese: "đọc sách", englishExample: "I read books every night before bed.", vietnameseExample: "Tôi đọc sách mỗi tối trước khi đi ngủ." },
            { english: "draw pictures", vietnamese: "vẽ tranh", englishExample: "She likes to draw pictures of animals.", vietnameseExample: "Cô ấy thích vẽ tranh động vật." },
            { english: "write stories", vietnamese: "viết truyện", englishExample: "He writes short stories in English.", vietnameseExample: "Cậu ấy viết truyện ngắn bằng tiếng Anh." },
            { english: "cook", vietnamese: "nấu ăn", englishExample: "My mom and I cook together on weekends.", vietnameseExample: "Tôi và mẹ cùng nấu ăn vào cuối tuần." },
            { english: "play an instrument", vietnamese: "chơi nhạc cụ", englishExample: "I can play an instrument, the guitar.", vietnameseExample: "Tôi biết chơi một nhạc cụ, đó là đàn guitar." },
            { english: "watch TV", vietnamese: "xem tivi", englishExample: "My family watches TV after dinner.", vietnameseExample: "Gia đình tôi xem tivi sau bữa tối." },
            { english: "watch cartoons", vietnamese: "xem phim hoạt hình", englishExample: "The kids love watching cartoons.", vietnameseExample: "Bọn trẻ thích xem phim hoạt hình." },
            { english: "watch a film", vietnamese: "xem phim", englishExample: "We watched a film at the cinema.", vietnameseExample: "Chúng tôi xem một bộ phim ở rạp." },
            { english: "listen to music", vietnamese: "nghe nhạc", englishExample: "I listen to music while studying.", vietnameseExample: "Tôi nghe nhạc khi học bài." },
            { english: "play the guitar", vietnamese: "chơi đàn guitar", englishExample: "He can play the guitar very well.", vietnameseExample: "Cậu ấy có thể chơi đàn guitar rất hay." },
            { english: "play the piano", vietnamese: "chơi đàn piano", englishExample: "My sister plays the piano beautifully.", vietnameseExample: "Chị tôi chơi đàn piano rất hay." },
            { english: "draw", vietnamese: "vẽ", englishExample: "She draws pictures of animals.", vietnameseExample: "Cô ấy vẽ tranh về các loài động vật." },
            { english: "paint", vietnamese: "sơn, vẽ màu", englishExample: "I like to paint in my free time.", vietnameseExample: "Tôi thích vẽ màu vào lúc rảnh." },
            { english: "make videos", vietnamese: "làm video", englishExample: "They make videos for their school project.", vietnameseExample: "Họ làm video cho dự án của trường." },
            { english: "take photos", vietnamese: "chụp ảnh", englishExample: "I take photos of the sunset.", vietnameseExample: "Tôi chụp ảnh hoàng hôn." },
            { english: "read comics", vietnamese: "đọc truyện tranh", englishExample: "I read comics before going to bed.", vietnameseExample: "Tôi đọc truyện tranh trước khi đi ngủ." },
            { english: "read magazines", vietnamese: "đọc tạp chí", englishExample: "She likes reading fashion magazines.", vietnameseExample: "Cô ấy thích đọc tạp chí thời trang." },
            { english: "bake cakes", vietnamese: "nướng bánh", englishExample: "My mom bakes cakes for my birthday.", vietnameseExample: "Mẹ tôi nướng bánh cho sinh nhật của tôi." },
            { english: "do gardening", vietnamese: "làm vườn", englishExample: "My grandparents love doing gardening.", vietnameseExample: "Ông bà tôi thích làm vườn." },
            { english: "grow plants", vietnamese: "trồng cây", englishExample: "We grow plants in the school garden.", vietnameseExample: "Chúng tôi trồng cây trong vườn trường." },
            { english: "play board games", vietnamese: "chơi trò chơi bàn cờ", englishExample: "We play board games on rainy days.", vietnameseExample: "Chúng tôi chơi trò chơi bàn cờ vào những ngày mưa." },
            { english: "do homework", vietnamese: "làm bài tập", englishExample: "I always do my homework after dinner.", vietnameseExample: "Tôi luôn làm bài tập sau bữa tối." },
            { english: "help parents", vietnamese: "giúp bố mẹ", englishExample: "We help our parents with housework.", vietnameseExample: "Chúng tôi giúp bố mẹ làm việc nhà." },
            { english: "volunteer", vietnamese: "làm tình nguyện", englishExample: "Students volunteer to clean the classroom.", vietnameseExample: "Học sinh tình nguyện dọn lớp học." }
        ]
    },
    {
        title: "3.4: Technology and Online Fun",
        words: [
            { english: "use the computer", vietnamese: "sử dụng máy tính", englishExample: "I use the computer to do my homework.", vietnameseExample: "Tôi sử dụng máy tính để làm bài tập." },
            { english: "use the Internet", vietnamese: "sử dụng Internet", englishExample: "She uses the Internet to search for information.", vietnameseExample: "Cô ấy dùng Internet để tìm thông tin." },
            { english: "go online", vietnamese: "lên mạng", englishExample: "Many students go online to study English.", vietnameseExample: "Nhiều học sinh lên mạng để học tiếng Anh." },
            { english: "surf the Internet", vietnamese: "lướt mạng", englishExample: "I surf the Internet in my free time.", vietnameseExample: "Tôi lướt mạng vào lúc rảnh." },
            { english: "check email", vietnamese: "kiểm tra email", englishExample: "I check my email every morning.", vietnameseExample: "Tôi kiểm tra email mỗi sáng." },
            { english: "watch videos", vietnamese: "xem video", englishExample: "We watch funny videos online.", vietnameseExample: "Chúng tôi xem video hài trên mạng." },
            { english: "play computer games", vietnamese: "chơi trò chơi trên máy tính", englishExample: "My brother plays computer games after school.", vietnameseExample: "Anh trai tôi chơi trò chơi trên máy tính sau giờ học." },
            { english: "play online games", vietnamese: "chơi trò chơi trực tuyến", englishExample: "He likes playing online games with friends.", vietnameseExample: "Cậu ấy thích chơi game trực tuyến với bạn." },
            { english: "chat online", vietnamese: "trò chuyện trực tuyến", englishExample: "I chat online with my friends every evening.", vietnameseExample: "Tôi trò chuyện trực tuyến với bạn bè mỗi tối." },
            { english: "send messages", vietnamese: "gửi tin nhắn", englishExample: "She sends messages to her classmates.", vietnameseExample: "Cô ấy gửi tin nhắn cho bạn cùng lớp." },
            { english: "take selfies", vietnamese: "chụp ảnh selfie", englishExample: "They love taking selfies at school.", vietnameseExample: "Họ thích chụp ảnh selfie ở trường." },
            { english: "post photos", vietnamese: "đăng ảnh", englishExample: "I post photos on my social media.", vietnameseExample: "Tôi đăng ảnh lên mạng xã hội." },
            { english: "download music", vietnamese: "tải nhạc", englishExample: "I download music to listen offline.", vietnameseExample: "Tôi tải nhạc để nghe khi không có mạng." },
            { english: "upload videos", vietnamese: "tải video lên", englishExample: "We upload videos to our class channel.", vietnameseExample: "Chúng tôi tải video lên kênh lớp học." },
            { english: "create content", vietnamese: "tạo nội dung", englishExample: "She creates fun content for her blog.", vietnameseExample: "Cô ấy tạo nội dung vui nhộn cho blog của mình." },
            { english: "follow", vietnamese: "theo dõi", englishExample: "I follow my favorite singers online.", vietnameseExample: "Tôi theo dõi các ca sĩ yêu thích trên mạng." },
            { english: "subscribe", vietnamese: "đăng ký theo dõi", englishExample: "Don't forget to subscribe to our channel!", vietnameseExample: "Đừng quên đăng ký theo dõi kênh của chúng tôi nhé!" },
            { english: "comment", vietnamese: "bình luận", englishExample: "He often comments on my posts.", vietnameseExample: "Cậu ấy thường bình luận vào bài viết của tôi." },
            { english: "share", vietnamese: "chia sẻ", englishExample: "I share my favorite songs with friends.", vietnameseExample: "Tôi chia sẻ những bài hát yêu thích với bạn bè." },
            { english: "spend time online", vietnamese: "dành thời gian trên mạng", englishExample: "Don't spend too much time online!", vietnameseExample: "Đừng dành quá nhiều thời gian trên mạng nhé!" }
        ]
    },
    {
        title: "4.1: Daily Activities",
        words: [
            { english: "wake up", vietnamese: "thức dậy", englishExample: "I wake up at six o'clock every day.", vietnameseExample: "Tôi thức dậy lúc sáu giờ mỗi ngày." },
            { english: "get up", vietnamese: "ra khỏi giường", englishExample: "He gets up and makes his bed.", vietnameseExample: "Cậu ấy dậy và dọn giường." },
            { english: "brush teeth", vietnamese: "đánh răng", englishExample: "I brush my teeth twice a day.", vietnameseExample: "Tôi đánh răng hai lần mỗi ngày." },
            { english: "wash face", vietnamese: "rửa mặt", englishExample: "She washes her face before breakfast.", vietnameseExample: "Cô ấy rửa mặt trước bữa sáng." },
            { english: "have breakfast", vietnamese: "ăn sáng", englishExample: "We have breakfast at seven o'clock.", vietnameseExample: "Chúng tôi ăn sáng lúc bảy giờ." },
            { english: "go to school", vietnamese: "đi học", englishExample: "I go to school by bike.", vietnameseExample: "Tôi đi học bằng xe đạp." },
            { english: "study", vietnamese: "học bài", englishExample: "They study English in the morning.", vietnameseExample: "Họ học tiếng Anh vào buổi sáng." },
            { english: "have lunch", vietnamese: "ăn trưa", englishExample: "We have lunch at the school canteen.", vietnameseExample: "Chúng tôi ăn trưa ở căn tin trường." },
            { english: "go home", vietnamese: "về nhà", englishExample: "I go home at half past four.", vietnameseExample: "Tôi về nhà lúc bốn giờ rưỡi." },
            { english: "do homework", vietnamese: "làm bài tập", englishExample: "I do my homework after dinner.", vietnameseExample: "Tôi làm bài tập sau bữa tối." },
            { english: "watch TV", vietnamese: "xem tivi", englishExample: "My family watches TV in the evening.", vietnameseExample: "Gia đình tôi xem tivi vào buổi tối." },
            { english: "have dinner", vietnamese: "ăn tối", englishExample: "We have dinner together at seven.", vietnameseExample: "Chúng tôi ăn tối cùng nhau lúc bảy giờ." },
            { english: "take a shower", vietnamese: "tắm", englishExample: "I take a shower before going to bed.", vietnameseExample: "Tôi tắm trước khi đi ngủ." },
            { english: "go to bed", vietnamese: "đi ngủ", englishExample: "He goes to bed at ten o'clock.", vietnameseExample: "Cậu ấy đi ngủ lúc mười giờ." },
            { english: "feed the pets", vietnamese: "cho thú cưng ăn", englishExample: "She feeds her dog every morning.", vietnameseExample: "Cô ấy cho chó ăn mỗi sáng." },
            { english: "go shopping", vietnamese: "đi mua sắm", englishExample: "My mom and I go shopping on Sundays.", vietnameseExample: "Tôi và mẹ đi mua sắm vào Chủ nhật." },
            { english: "help parents", vietnamese: "giúp bố mẹ", englishExample: "I help my parents with housework.", vietnameseExample: "Tôi giúp bố mẹ làm việc nhà." },
            { english: "play with friends", vietnamese: "chơi với bạn", englishExample: "The children play with friends after class.", vietnameseExample: "Bọn trẻ chơi với bạn sau giờ học." },
            { english: "read books", vietnamese: "đọc sách", englishExample: "I read books before going to sleep.", vietnameseExample: "Tôi đọc sách trước khi đi ngủ." }
        ]
    },
    {
        title: "4.2: Household Chores",
        words: [
            { english: "do the housework", vietnamese: "làm việc nhà", englishExample: "I help my mom do the housework.", vietnameseExample: "Tôi giúp mẹ làm việc nhà." },
            { english: "clean the house", vietnamese: "dọn dẹp nhà cửa", englishExample: "We clean the house every weekend.", vietnameseExample: "Chúng tôi dọn nhà mỗi cuối tuần." },
            { english: "tidy the room", vietnamese: "dọn phòng", englishExample: "She tidies her room before going out.", vietnameseExample: "Cô ấy dọn phòng trước khi ra ngoài." },
            { english: "make the bed", vietnamese: "dọn giường", englishExample: "I make my bed after getting up.", vietnameseExample: "Tôi dọn giường sau khi thức dậy." },
            { english: "wash the dishes", vietnamese: "rửa bát", englishExample: "He washes the dishes after dinner.", vietnameseExample: "Cậu ấy rửa bát sau bữa tối." },
            { english: "do the laundry", vietnamese: "giặt quần áo", englishExample: "My sister does the laundry on Sundays.", vietnameseExample: "Chị tôi giặt đồ vào Chủ nhật." },
            { english: "iron the clothes", vietnamese: "ủi quần áo", englishExample: "Mom irons the clothes every morning.", vietnameseExample: "Mẹ ủi quần áo mỗi sáng." },
            { english: "sweep the floor", vietnamese: "quét nhà", englishExample: "I sweep the floor after breakfast.", vietnameseExample: "Tôi quét nhà sau bữa sáng." },
            { english: "mop the floor", vietnamese: "lau sàn nhà", englishExample: "Dad mops the floor in the evening.", vietnameseExample: "Bố lau sàn vào buổi tối." },
            { english: "cook dinner", vietnamese: "nấu bữa tối", englishExample: "I cook dinner for my family.", vietnameseExample: "Tôi nấu bữa tối cho gia đình." },
            { english: "wash the car", vietnamese: "rửa xe", englishExample: "We wash the car every Saturday.", vietnameseExample: "Chúng tôi rửa xe mỗi thứ Bảy." },
            { english: "water the plants", vietnamese: "tưới cây", englishExample: "She waters the plants every morning.", vietnameseExample: "Cô ấy tưới cây mỗi sáng." },
            { english: "take out the rubbish", vietnamese: "đổ rác", englishExample: "He takes out the rubbish every night.", vietnameseExample: "Cậu ấy đổ rác mỗi tối." },
            { english: "set the table", vietnamese: "dọn bàn ăn", englishExample: "She sets the table before dinner.", vietnameseExample: "Cô ấy dọn bàn trước bữa tối." },
            { english: "clear the table", vietnamese: "dọn bàn ăn sau bữa", englishExample: "We clear the table after eating.", vietnameseExample: "Chúng tôi dọn bàn sau khi ăn." },
            { english: "wash the windows", vietnamese: "lau cửa sổ", englishExample: "I wash the windows once a month.", vietnameseExample: "Tôi lau cửa sổ mỗi tháng một lần." },
            { english: "take care of", vietnamese: "chăm sóc", englishExample: "She takes care of her little brother.", vietnameseExample: "Cô ấy chăm sóc em trai mình." },
            { english: "share the chores", vietnamese: "chia sẻ việc nhà", englishExample: "All family members share the chores.", vietnameseExample: "Tất cả thành viên trong gia đình cùng chia sẻ việc nhà." }
        ]
    },
    {
        title: "4.3: Time and Daily Routines",
        words: [
            { english: "daily routine", vietnamese: "thói quen hằng ngày", englishExample: "My daily routine starts at six a.m.", vietnameseExample: "Thói quen hằng ngày của tôi bắt đầu lúc sáu giờ sáng." },
            { english: "in the morning", vietnamese: "vào buổi sáng", englishExample: "I usually read books in the morning.", vietnameseExample: "Tôi thường đọc sách vào buổi sáng." },
            { english: "in the afternoon", vietnamese: "vào buổi chiều", englishExample: "We play football in the afternoon.", vietnameseExample: "Chúng tôi chơi bóng đá vào buổi chiều." },
            { english: "in the evening", vietnamese: "vào buổi tối", englishExample: "My family watches TV in the evening.", vietnameseExample: "Gia đình tôi xem tivi vào buổi tối." },
            { english: "at night", vietnamese: "vào ban đêm", englishExample: "He studies English at night.", vietnameseExample: "Cậu ấy học tiếng Anh vào ban đêm." },
            { english: "early", vietnamese: "sớm", englishExample: "She gets up early every day.", vietnameseExample: "Cô ấy dậy sớm mỗi ngày." },
            { english: "late", vietnamese: "muộn", englishExample: "He often goes to bed late.", vietnameseExample: "Cậu ấy thường đi ngủ muộn." },
            { english: "sometimes", vietnamese: "thỉnh thoảng", englishExample: "I sometimes go out with my friends.", vietnameseExample: "Thỉnh thoảng tôi đi chơi với bạn." },
            { english: "always", vietnamese: "luôn luôn", englishExample: "She always helps her mom with cooking.", vietnameseExample: "Cô ấy luôn giúp mẹ nấu ăn." },
            { english: "usually", vietnamese: "thường xuyên", englishExample: "I usually walk to school.", vietnameseExample: "Tôi thường đi bộ đến trường." },
            { english: "often", vietnamese: "thường", englishExample: "We often have lunch at the canteen.", vietnameseExample: "Chúng tôi thường ăn trưa ở căn tin." },
            { english: "never", vietnamese: "không bao giờ", englishExample: "I never watch TV in the morning.", vietnameseExample: "Tôi không bao giờ xem tivi vào buổi sáng." },
            { english: "every day", vietnamese: "mỗi ngày", englishExample: "I do my homework every day.", vietnameseExample: "Tôi làm bài tập mỗi ngày." },
            { english: "once a week", vietnamese: "một lần mỗi tuần", englishExample: "We clean the classroom once a week.", vietnameseExample: "Chúng tôi dọn lớp học mỗi tuần một lần." },
            { english: "twice a day", vietnamese: "hai lần mỗi ngày", englishExample: "I brush my teeth twice a day.", vietnameseExample: "Tôi đánh răng hai lần mỗi ngày." },
            { english: "get dressed", vietnamese: "mặc quần áo", englishExample: "He gets dressed after taking a shower.", vietnameseExample: "Cậu ấy mặc quần áo sau khi tắm." }
        ]
    },
    {
        title: "4.4: Weekend Activities",
        words: [
            { english: "at the weekend", vietnamese: "vào cuối tuần", englishExample: "We visit our grandparents at the weekend.", vietnameseExample: "Chúng tôi thăm ông bà vào cuối tuần." },
            { english: "after school", vietnamese: "sau giờ học", englishExample: "I play basketball after school.", vietnameseExample: "Tôi chơi bóng rổ sau giờ học." },
            { english: "before dinner", vietnamese: "trước bữa tối", englishExample: "She takes a shower before dinner.", vietnameseExample: "Cô ấy tắm trước bữa tối." },
            { english: "relax", vietnamese: "thư giãn", englishExample: "I relax at home on weekends.", vietnameseExample: "Tôi thư giãn ở nhà vào cuối tuần." },
            { english: "go shopping", vietnamese: "đi mua sắm", englishExample: "My mom and I go shopping on Saturday.", vietnameseExample: "Tôi và mẹ đi mua sắm vào thứ Bảy." },
            { english: "visit grandparents", vietnamese: "thăm ông bà", englishExample: "We visit our grandparents every weekend.", vietnameseExample: "Chúng tôi thăm ông bà mỗi cuối tuần." },
            { english: "hang out", vietnamese: "đi chơi", englishExample: "I hang out with my best friend on Sunday.", vietnameseExample: "Tôi đi chơi với bạn thân vào Chủ nhật." },
            { english: "watch movies", vietnamese: "xem phim", englishExample: "We watch movies together on weekends.", vietnameseExample: "Chúng tôi xem phim cùng nhau vào cuối tuần." },
            { english: "play games", vietnamese: "chơi trò chơi", englishExample: "He plays games with his brother.", vietnameseExample: "Cậu ấy chơi trò chơi với anh trai mình." },
            { english: "go for a walk", vietnamese: "đi dạo", englishExample: "My parents go for a walk every morning.", vietnameseExample: "Bố mẹ tôi đi dạo mỗi sáng." },
            { english: "go on a picnic", vietnamese: "đi dã ngoại", englishExample: "Our class goes on a picnic once a year.", vietnameseExample: "Lớp chúng tôi đi dã ngoại mỗi năm một lần." },
            { english: "go camping", vietnamese: "đi cắm trại", englishExample: "They go camping in the mountains.", vietnameseExample: "Họ đi cắm trại trên núi." },
            { english: "read books", vietnamese: "đọc sách", englishExample: "I read English books on Sundays.", vietnameseExample: "Tôi đọc sách tiếng Anh vào Chủ nhật." },
            { english: "listen to music", vietnamese: "nghe nhạc", englishExample: "She listens to music to relax.", vietnameseExample: "Cô ấy nghe nhạc để thư giãn." },
            { english: "take photos", vietnamese: "chụp ảnh", englishExample: "We take photos at the park.", vietnameseExample: "Chúng tôi chụp ảnh ở công viên." },
            { english: "cook", vietnamese: "nấu ăn", englishExample: "My family cooks together on weekends.", vietnameseExample: "Gia đình tôi cùng nhau nấu ăn vào cuối tuần." },
            { english: "do homework", vietnamese: "làm bài tập", englishExample: "I do my homework on Sunday evening.", vietnameseExample: "Tôi làm bài tập vào tối Chủ nhật." },
            { english: "visit friends", vietnamese: "thăm bạn bè", englishExample: "He visits his friends in another town.", vietnameseExample: "Cậu ấy thăm bạn ở thị trấn khác." },
            { english: "go out", vietnamese: "ra ngoài", englishExample: "Let's go out and have some fun!", vietnameseExample: "Hãy ra ngoài và vui chơi một chút!" },
            { english: "rest", vietnamese: "nghỉ ngơi", englishExample: "I need to rest after a busy week.", vietnameseExample: "Tôi cần nghỉ ngơi sau một tuần bận rộn." },
            { english: "spend time with family", vietnamese: "dành thời gian cho gia đình", englishExample: "We spend time with our family at home.", vietnameseExample: "Chúng tôi dành thời gian bên gia đình tại nhà." }
        ]
    },
    {
        title: "5.1: Food and Meals",
        words: [
            { english: "breakfast", vietnamese: "bữa sáng", englishExample: "I usually have bread and milk for breakfast.", vietnameseExample: "Tôi thường ăn bánh mì và uống sữa cho bữa sáng." },
            { english: "lunch", vietnamese: "bữa trưa", englishExample: "We have lunch at school every day.", vietnameseExample: "Chúng tôi ăn trưa ở trường mỗi ngày." },
            { english: "dinner", vietnamese: "bữa tối", englishExample: "My family has dinner together at seven.", vietnameseExample: "Gia đình tôi ăn tối cùng nhau lúc bảy giờ." },
            { english: "meal", vietnamese: "bữa ăn", englishExample: "Breakfast is the most important meal of the day.", vietnameseExample: "Bữa sáng là bữa ăn quan trọng nhất trong ngày." },
            { english: "rice", vietnamese: "cơm, gạo", englishExample: "Vietnamese people eat rice every day.", vietnameseExample: "Người Việt Nam ăn cơm mỗi ngày." },
            { english: "noodles", vietnamese: "mì", englishExample: "I like eating noodles for breakfast.", vietnameseExample: "Tôi thích ăn mì vào bữa sáng." },
            { english: "bread", vietnamese: "bánh mì", englishExample: "She eats bread with butter.", vietnameseExample: "Cô ấy ăn bánh mì với bơ." },
            { english: "soup", vietnamese: "súp, canh", englishExample: "Mom cooks chicken soup for lunch.", vietnameseExample: "Mẹ nấu súp gà cho bữa trưa." },
            { english: "meat", vietnamese: "thịt", englishExample: "We have meat and vegetables for dinner.", vietnameseExample: "Chúng tôi ăn thịt và rau cho bữa tối." },
            { english: "fish", vietnamese: "cá", englishExample: "He likes grilled fish.", vietnameseExample: "Cậu ấy thích ăn cá nướng." },
            { english: "egg", vietnamese: "trứng", englishExample: "I have a boiled egg every morning.", vietnameseExample: "Tôi ăn một quả trứng luộc mỗi sáng." },
            { english: "vegetable", vietnamese: "rau củ", englishExample: "Eat more vegetables to stay healthy.", vietnameseExample: "Hãy ăn nhiều rau để khỏe mạnh." },
            { english: "fruit", vietnamese: "trái cây", englishExample: "She eats fruit after every meal.", vietnameseExample: "Cô ấy ăn trái cây sau mỗi bữa ăn." },
            { english: "chicken", vietnamese: "thịt gà", englishExample: "We often eat chicken on Sundays.", vietnameseExample: "Chúng tôi thường ăn thịt gà vào Chủ nhật." },
            { english: "beef", vietnamese: "thịt bò", englishExample: "Beef is more expensive than pork.", vietnameseExample: "Thịt bò đắt hơn thịt heo." },
            { english: "pork", vietnamese: "thịt heo", englishExample: "Pork is popular in Vietnam.", vietnameseExample: "Thịt heo rất phổ biến ở Việt Nam." },
            { english: "seafood", vietnamese: "hải sản", englishExample: "Da Nang is famous for its seafood.", vietnameseExample: "Đà Nẵng nổi tiếng với hải sản." },
            { english: "salad", vietnamese: "rau trộn", englishExample: "I eat salad when I want to eat light food.", vietnameseExample: "Tôi ăn rau trộn khi muốn ăn nhẹ." },
            { english: "sandwich", vietnamese: "bánh mì kẹp", englishExample: "She brings a sandwich for lunch.", vietnameseExample: "Cô ấy mang bánh mì kẹp cho bữa trưa." },
            { english: "dessert", vietnamese: "món tráng miệng", englishExample: "We have fruit for dessert.", vietnameseExample: "Chúng tôi ăn trái cây làm món tráng miệng." }
        ]
    },
    {
        title: "5.2: Drinks and Beverages",
        words: [
            { english: "water", vietnamese: "nước", englishExample: "We should drink a lot of water every day.", vietnameseExample: "Chúng ta nên uống nhiều nước mỗi ngày." },
            { english: "mineral water", vietnamese: "nước khoáng", englishExample: "She always drinks mineral water at lunch.", vietnameseExample: "Cô ấy luôn uống nước khoáng vào bữa trưa." },
            { english: "juice", vietnamese: "nước ép", englishExample: "I like orange juice for breakfast.", vietnameseExample: "Tôi thích nước cam vào bữa sáng." },
            { english: "milk", vietnamese: "sữa", englishExample: "Children need milk to grow strong.", vietnameseExample: "Trẻ em cần sữa để phát triển khỏe mạnh." },
            { english: "tea", vietnamese: "trà", englishExample: "My grandmother drinks tea every morning.", vietnameseExample: "Bà tôi uống trà mỗi sáng." },
            { english: "coffee", vietnamese: "cà phê", englishExample: "My father drinks a cup of coffee before work.", vietnameseExample: "Bố tôi uống một tách cà phê trước khi đi làm." },
            { english: "soft drink", vietnamese: "nước ngọt", englishExample: "We shouldn't drink too many soft drinks.", vietnameseExample: "Chúng ta không nên uống quá nhiều nước ngọt." },
            { english: "soda", vietnamese: "nước có ga", englishExample: "He likes cold soda on hot days.", vietnameseExample: "Cậu ấy thích uống soda lạnh vào những ngày nóng." },
            { english: "lemonade", vietnamese: "nước chanh", englishExample: "Lemonade is a refreshing drink.", vietnameseExample: "Nước chanh là một đồ uống sảng khoái." },
            { english: "smoothie", vietnamese: "sinh tố", englishExample: "I make a banana smoothie for breakfast.", vietnameseExample: "Tôi làm sinh tố chuối cho bữa sáng." },
            { english: "coconut water", vietnamese: "nước dừa", englishExample: "Tourists love to drink coconut water in Vietnam.", vietnameseExample: "Du khách thích uống nước dừa ở Việt Nam." },
            { english: "hot chocolate", vietnamese: "sô-cô-la nóng", englishExample: "We drink hot chocolate in winter.", vietnameseExample: "Chúng tôi uống sô-cô-la nóng vào mùa đông." },
            { english: "energy drink", vietnamese: "nước tăng lực", englishExample: "Energy drinks can make you feel awake.", vietnameseExample: "Nước tăng lực có thể giúp bạn tỉnh táo." },
            { english: "ice tea", vietnamese: "trà đá", englishExample: "Ice tea is popular in Vietnam.", vietnameseExample: "Trà đá rất phổ biến ở Việt Nam." },
            { english: "bottle of water", vietnamese: "chai nước", englishExample: "Please bring me a bottle of water.", vietnameseExample: "Làm ơn mang cho tôi một chai nước." },
            { english: "cup of coffee", vietnamese: "tách cà phê", englishExample: "He drinks a cup of coffee every morning.", vietnameseExample: "Cậu ấy uống một tách cà phê mỗi sáng." },
            { english: "glass of milk", vietnamese: "ly sữa", englishExample: "The baby drinks a glass of milk before bed.", vietnameseExample: "Em bé uống một ly sữa trước khi đi ngủ." },
            { english: "can of soda", vietnamese: "lon nước ngọt", englishExample: "I bought a can of soda from the shop.", vietnameseExample: "Tôi mua một lon nước ngọt ở cửa hàng." },
            { english: "drink", vietnamese: "đồ uống / uống", englishExample: "What would you like to drink?", vietnameseExample: "Bạn muốn uống gì?" },
            { english: "thirsty", vietnamese: "khát nước", englishExample: "I'm thirsty. Can I have some water?", vietnameseExample: "Tôi khát. Cho tôi ít nước được không?" }
        ]
    },
    {
        title: "5.3: Eating Habits and Table Manners",
        words: [
            { english: "eat", vietnamese: "ăn", englishExample: "We eat three meals a day.", vietnameseExample: "Chúng tôi ăn ba bữa mỗi ngày." },
            { english: "drink", vietnamese: "uống", englishExample: "I drink milk every morning.", vietnameseExample: "Tôi uống sữa mỗi sáng." },
            { english: "have a meal", vietnamese: "dùng bữa", englishExample: "We have a meal together at home.", vietnameseExample: "Chúng tôi cùng nhau dùng bữa ở nhà." },
            { english: "have breakfast", vietnamese: "ăn sáng", englishExample: "I have breakfast at 6:30 a.m.", vietnameseExample: "Tôi ăn sáng lúc 6 giờ 30." },
            { english: "have lunch", vietnamese: "ăn trưa", englishExample: "The students have lunch in the canteen.", vietnameseExample: "Học sinh ăn trưa ở căn tin." },
            { english: "have dinner", vietnamese: "ăn tối", englishExample: "My family has dinner at seven o'clock.", vietnameseExample: "Gia đình tôi ăn tối lúc bảy giờ." },
            { english: "eat out", vietnamese: "ăn ngoài", englishExample: "We sometimes eat out on Sundays.", vietnameseExample: "Thỉnh thoảng chúng tôi đi ăn ngoài vào Chủ nhật." },
            { english: "eat healthy food", vietnamese: "ăn thực phẩm lành mạnh", englishExample: "I try to eat healthy food every day.", vietnameseExample: "Tôi cố gắng ăn thực phẩm lành mạnh mỗi ngày." },
            { english: "junk food", vietnamese: "đồ ăn nhanh", englishExample: "Junk food is not good for your health.", vietnameseExample: "Đồ ăn nhanh không tốt cho sức khỏe." },
            { english: "fast food", vietnamese: "thức ăn nhanh", englishExample: "Fast food is tasty but unhealthy.", vietnameseExample: "Thức ăn nhanh ngon nhưng không lành mạnh." },
            { english: "balanced diet", vietnamese: "chế độ ăn cân bằng", englishExample: "A balanced diet keeps you healthy.", vietnameseExample: "Chế độ ăn cân bằng giúp bạn khỏe mạnh." },
            { english: "chopsticks", vietnamese: "đũa", englishExample: "Vietnamese people eat with chopsticks.", vietnameseExample: "Người Việt ăn bằng đũa." },
            { english: "spoon", vietnamese: "muỗng", englishExample: "Use a spoon for the soup.", vietnameseExample: "Dùng muỗng để ăn súp." },
            { english: "fork", vietnamese: "nĩa", englishExample: "She eats salad with a fork.", vietnameseExample: "Cô ấy ăn rau trộn bằng nĩa." },
            { english: "plate", vietnamese: "đĩa", englishExample: "Please put the food on the plate.", vietnameseExample: "Làm ơn để thức ăn lên đĩa." },
            { english: "bowl", vietnamese: "bát, tô", englishExample: "I eat rice from a bowl.", vietnameseExample: "Tôi ăn cơm bằng bát." },
            { english: "napkin", vietnamese: "khăn ăn", englishExample: "Don't forget to use a napkin.", vietnameseExample: "Đừng quên dùng khăn ăn." },
            { english: "table manners", vietnamese: "phép lịch sự trên bàn ăn", englishExample: "Good table manners show your respect.", vietnameseExample: "Phép lịch sự trên bàn ăn thể hiện sự tôn trọng của bạn." },
            { english: "say \"thank you\"", vietnamese: "nói “cảm ơn”", englishExample: "Always say \"thank you\" after a meal.", vietnameseExample: "Luôn nói “cảm ơn” sau bữa ăn." },
            { english: "share food", vietnamese: "chia sẻ món ăn", englishExample: "In my family, we always share food.", vietnameseExample: "Trong gia đình tôi, mọi người luôn chia sẻ món ăn." }
        ]
    },
    {
        title: "6.1: Parts of the Body",
        words: [
            { english: "head", vietnamese: "đầu", englishExample: "I have a headache.", vietnameseExample: "Tôi bị đau đầu." },
            { english: "face", vietnamese: "khuôn mặt", englishExample: "She has a beautiful face.", vietnameseExample: "Cô ấy có khuôn mặt xinh đẹp." },
            { english: "hair", vietnamese: "tóc", englishExample: "His hair is short and black.", vietnameseExample: "Tóc của anh ấy ngắn và đen." },
            { english: "eye", vietnamese: "mắt", englishExample: "I have two brown eyes.", vietnameseExample: "Tôi có hai mắt màu nâu." },
            { english: "ear", vietnamese: "tai", englishExample: "My ears hurt because of the loud music.", vietnameseExample: "Tai tôi đau vì nhạc quá to." },
            { english: "nose", vietnamese: "mũi", englishExample: "He has a small nose.", vietnameseExample: "Anh ấy có cái mũi nhỏ." },
            { english: "mouth", vietnamese: "miệng", englishExample: "Don't talk with your mouth full.", vietnameseExample: "Đừng nói chuyện khi đang ngậm thức ăn." },
            { english: "tooth", vietnamese: "răng", englishExample: "Brush your teeth twice a day.", vietnameseExample: "Đánh răng hai lần mỗi ngày." },
            { english: "tongue", vietnamese: "lưỡi", englishExample: "The tongue helps us taste food.", vietnameseExample: "Lưỡi giúp chúng ta nếm thức ăn." },
            { english: "neck", vietnamese: "cổ", englishExample: "He wears a scarf around his neck.", vietnameseExample: "Anh ấy đeo khăn quanh cổ." },
            { english: "shoulder", vietnamese: "vai", englishExample: "She carries her bag on her shoulder.", vietnameseExample: "Cô ấy đeo túi trên vai." },
            { english: "arm", vietnamese: "cánh tay", englishExample: "He broke his arm yesterday.", vietnameseExample: "Cậu ấy bị gãy tay hôm qua." },
            { english: "hand", vietnamese: "bàn tay", englishExample: "Wash your hands before eating.", vietnameseExample: "Rửa tay trước khi ăn." },
            { english: "finger", vietnamese: "ngón tay", englishExample: "I cut my finger while cooking.", vietnameseExample: "Tôi bị đứt ngón tay khi nấu ăn." },
            { english: "leg", vietnamese: "chân", englishExample: "My legs are tired after running.", vietnameseExample: "Chân tôi mỏi sau khi chạy." },
            { english: "foot", vietnamese: "bàn chân", englishExample: "My left foot hurts.", vietnameseExample: "Bàn chân trái của tôi bị đau." },
            { english: "knee", vietnamese: "đầu gối", englishExample: "Don't bend your knee too much.", vietnameseExample: "Đừng gập đầu gối quá nhiều." },
            { english: "back", vietnamese: "lưng", englishExample: "My back hurts after sitting too long.", vietnameseExample: "Lưng tôi đau sau khi ngồi quá lâu." },
            { english: "stomach", vietnamese: "bụng, dạ dày", englishExample: "I have a stomachache.", vietnameseExample: "Tôi bị đau bụng." },
            { english: "skin", vietnamese: "da", englishExample: "Her skin is soft and smooth.", vietnameseExample: "Da của cô ấy mềm và mịn." }
        ]
    },
    {
        title: "6.2: Health Problems and Feelings",
        words: [
            { english: "healthy", vietnamese: "khỏe mạnh", englishExample: "She eats fruit every day to stay healthy.", vietnameseExample: "Cô ấy ăn trái cây mỗi ngày để giữ sức khỏe." },
            { english: "sick", vietnamese: "ốm, bệnh", englishExample: "I feel sick today, so I can't go to school.", vietnameseExample: "Hôm nay tôi bị ốm nên không thể đi học." },
            { english: "ill", vietnamese: "bị bệnh", englishExample: "He has been ill for two days.", vietnameseExample: "Cậu ấy bị bệnh hai ngày rồi." },
            { english: "tired", vietnamese: "mệt mỏi", englishExample: "I feel tired after studying all night.", vietnameseExample: "Tôi thấy mệt sau khi học cả đêm." },
            { english: "weak", vietnamese: "yếu", englishExample: "She felt weak after the flu.", vietnameseExample: "Cô ấy cảm thấy yếu sau khi bị cảm cúm." },
            { english: "strong", vietnamese: "mạnh mẽ, khỏe", englishExample: "He is strong because he plays sports every day.", vietnameseExample: "Cậu ấy khỏe mạnh vì chơi thể thao mỗi ngày." },
            { english: "headache", vietnamese: "đau đầu", englishExample: "I have a terrible headache.", vietnameseExample: "Tôi bị đau đầu khủng khiếp." },
            { english: "toothache", vietnamese: "đau răng", englishExample: "He can't eat because of a toothache.", vietnameseExample: "Cậu ấy không thể ăn vì đau răng." },
            { english: "stomachache", vietnamese: "đau bụng", englishExample: "I have a stomachache after eating too much.", vietnameseExample: "Tôi bị đau bụng sau khi ăn quá nhiều." },
            { english: "backache", vietnamese: "đau lưng", englishExample: "My dad has a backache from sitting too long.", vietnameseExample: "Bố tôi bị đau lưng vì ngồi quá lâu." },
            { english: "sore throat", vietnamese: "đau họng", englishExample: "She can't sing because of a sore throat.", vietnameseExample: "Cô ấy không thể hát vì đau họng." },
            { english: "fever", vietnamese: "sốt", englishExample: "The little boy has a high fever.", vietnameseExample: "Cậu bé bị sốt cao." },
            { english: "cough", vietnamese: "ho", englishExample: "Drink warm water if you have a cough.", vietnameseExample: "Hãy uống nước ấm nếu bạn bị ho." },
            { english: "cold", vietnamese: "cảm lạnh", englishExample: "Don't go out in the rain or you'll catch a cold.", vietnameseExample: "Đừng ra ngoài mưa kẻo bị cảm lạnh." },
            { english: "flu", vietnamese: "cảm cúm", englishExample: "The flu spreads easily in winter.", vietnameseExample: "Cảm cúm lây lan dễ dàng vào mùa đông." },
            { english: "medicine", vietnamese: "thuốc", englishExample: "Take this medicine twice a day.", vietnameseExample: "Uống thuốc này hai lần một ngày." },
            { english: "see a doctor", vietnamese: "đi khám bác sĩ", englishExample: "You should see a doctor if you feel sick.", vietnameseExample: "Bạn nên đi khám bác sĩ nếu cảm thấy ốm." },
            { english: "feel better", vietnamese: "cảm thấy khá hơn", englishExample: "I feel better after taking some rest.", vietnameseExample: "Tôi cảm thấy khá hơn sau khi nghỉ ngơi." },
            { english: "get well soon", vietnamese: "mau khỏe nhé", englishExample: "I hope you get well soon!", vietnameseExample: "Tôi mong bạn mau khỏe lại nhé!" },
            { english: "take care", vietnamese: "chăm sóc bản thân", englishExample: "Take care and don't work too hard.", vietnameseExample: "Hãy chăm sóc bản thân và đừng làm việc quá sức." }
        ]
    },
    {
        title: "6.3: Healthy Lifestyle",
        words: [
            { english: "exercise", vietnamese: "tập thể dục", englishExample: "We should exercise every morning.", vietnameseExample: "Chúng ta nên tập thể dục mỗi sáng." },
            { english: "do yoga", vietnamese: "tập yoga", englishExample: "My mom does yoga to relax.", vietnameseExample: "Mẹ tôi tập yoga để thư giãn." },
            { english: "go jogging", vietnamese: "chạy bộ", englishExample: "He goes jogging in the park every day.", vietnameseExample: "Cậu ấy chạy bộ trong công viên mỗi ngày." },
            { english: "play sports", vietnamese: "chơi thể thao", englishExample: "Playing sports helps us stay fit.", vietnameseExample: "Chơi thể thao giúp chúng ta giữ dáng." },
            { english: "eat healthy food", vietnamese: "ăn thực phẩm lành mạnh", englishExample: "Eat healthy food like fruits and vegetables.", vietnameseExample: "Hãy ăn thực phẩm lành mạnh như rau và trái cây." },
            { english: "drink water", vietnamese: "uống nước", englishExample: "Remember to drink enough water.", vietnameseExample: "Hãy nhớ uống đủ nước." },
            { english: "sleep well", vietnamese: "ngủ ngon, ngủ đủ giấc", englishExample: "It's important to sleep well every night.", vietnameseExample: "Ngủ đủ giấc mỗi đêm rất quan trọng." },
            { english: "go to bed early", vietnamese: "đi ngủ sớm", englishExample: "I go to bed early to wake up fresh.", vietnameseExample: "Tôi đi ngủ sớm để dậy tỉnh táo." },
            { english: "get up early", vietnamese: "dậy sớm", englishExample: "He gets up early and does morning exercise.", vietnameseExample: "Cậu ấy dậy sớm và tập thể dục buổi sáng." },
            { english: "stay up late", vietnamese: "thức khuya", englishExample: "Don't stay up late before an exam.", vietnameseExample: "Đừng thức khuya trước kỳ thi." },
            { english: "take a rest", vietnamese: "nghỉ ngơi", englishExample: "Take a rest when you feel tired.", vietnameseExample: "Hãy nghỉ ngơi khi bạn thấy mệt." },
            { english: "avoid junk food", vietnamese: "tránh đồ ăn nhanh", englishExample: "Avoid junk food to keep your body healthy.", vietnameseExample: "Tránh đồ ăn nhanh để cơ thể khỏe mạnh." },
            { english: "eat more fruit", vietnamese: "ăn nhiều trái cây", englishExample: "You should eat more fruit every day.", vietnameseExample: "Bạn nên ăn nhiều trái cây mỗi ngày." },
            { english: "eat less sugar", vietnamese: "ăn ít đường", englishExample: "Try to eat less sugar and candy.", vietnameseExample: "Hãy cố gắng ăn ít đường và kẹo." },
            { english: "wash hands", vietnamese: "rửa tay", englishExample: "Wash your hands before eating.", vietnameseExample: "Rửa tay trước khi ăn." },
            { english: "brush teeth", vietnamese: "đánh răng", englishExample: "Brush your teeth twice a day.", vietnameseExample: "Đánh răng hai lần mỗi ngày." },
            { english: "take exercise", vietnamese: "tập luyện", englishExample: "We take exercise in the school yard.", vietnameseExample: "Chúng tôi tập thể dục ở sân trường." },
            { english: "stay healthy", vietnamese: "giữ sức khỏe", englishExample: "Drinking water helps you stay healthy.", vietnameseExample: "Uống nước giúp bạn giữ sức khỏe." },
            { english: "keep fit", vietnamese: "giữ dáng", englishExample: "She goes swimming to keep fit.", vietnameseExample: "Cô ấy đi bơi để giữ dáng." },
            { english: "balanced diet", vietnamese: "chế độ ăn cân bằng", englishExample: "A balanced diet keeps you strong and healthy.", vietnameseExample: "Chế độ ăn cân bằng giúp bạn khỏe mạnh." }
        ]
    },
    {
        title: "7.1: Types of Places",
        words: [
            { english: "city", vietnamese: "thành phố", englishExample: "Ho Chi Minh City is very large and busy.", vietnameseExample: "Thành phố Hồ Chí Minh rất lớn và nhộn nhịp." },
            { english: "town", vietnamese: "thị trấn", englishExample: "My grandparents live in a small town.", vietnameseExample: "Ông bà tôi sống ở một thị trấn nhỏ." },
            { english: "village", vietnamese: "ngôi làng", englishExample: "The village is peaceful and green.", vietnameseExample: "Ngôi làng yên bình và xanh mát." },
            { english: "countryside", vietnamese: "nông thôn", englishExample: "I love the fresh air in the countryside.", vietnameseExample: "Tôi thích không khí trong lành ở nông thôn." },
            { english: "capital", vietnamese: "thủ đô", englishExample: "Hanoi is the capital of Vietnam.", vietnameseExample: "Hà Nội là thủ đô của Việt Nam." },
            { english: "street", vietnamese: "con đường", englishExample: "My house is on Nguyen Hue Street.", vietnameseExample: "Nhà tôi nằm trên đường Nguyễn Huệ." },
            { english: "road", vietnamese: "con đường, lộ", englishExample: "Be careful when you cross the road.", vietnameseExample: "Hãy cẩn thận khi băng qua đường." },
            { english: "park", vietnamese: "công viên", englishExample: "We often play in the park after school.", vietnameseExample: "Chúng tôi thường chơi ở công viên sau giờ học." },
            { english: "market", vietnamese: "chợ", englishExample: "My mom buys vegetables at the market.", vietnameseExample: "Mẹ tôi mua rau ở chợ." },
            { english: "supermarket", vietnamese: "siêu thị", englishExample: "There's a new supermarket near my house.", vietnameseExample: "Có một siêu thị mới gần nhà tôi." },
            { english: "restaurant", vietnamese: "nhà hàng", englishExample: "We have dinner at a nice restaurant.", vietnameseExample: "Chúng tôi ăn tối ở một nhà hàng đẹp." },
            { english: "café", vietnamese: "quán cà phê", englishExample: "Let's meet at the café after class.", vietnameseExample: "Hãy gặp nhau ở quán cà phê sau giờ học nhé." },
            { english: "museum", vietnamese: "bảo tàng", englishExample: "We visited the history museum last weekend.", vietnameseExample: "Chúng tôi đã đến thăm bảo tàng lịch sử cuối tuần rồi." },
            { english: "zoo", vietnamese: "sở thú", englishExample: "There are many animals in the zoo.", vietnameseExample: "Có nhiều loài động vật trong sở thú." },
            { english: "hospital", vietnamese: "bệnh viện", englishExample: "The hospital is next to the school.", vietnameseExample: "Bệnh viện nằm cạnh trường học." },
            { english: "school", vietnamese: "trường học", englishExample: "My school is big and beautiful.", vietnameseExample: "Trường tôi lớn và đẹp." },
            { english: "post office", vietnamese: "bưu điện", englishExample: "I went to the post office to send a letter.", vietnameseExample: "Tôi đến bưu điện để gửi thư." },
            { english: "cinema", vietnamese: "rạp chiếu phim", englishExample: "We go to the cinema to watch new movies.", vietnameseExample: "Chúng tôi đi rạp chiếu phim để xem phim mới." },
            { english: "bookstore", vietnamese: "hiệu sách", englishExample: "I bought an English book at the bookstore.", vietnameseExample: "Tôi mua một cuốn sách tiếng Anh ở hiệu sách." },
            { english: "stadium", vietnamese: "sân vận động", englishExample: "The football match is at the city stadium.", vietnameseExample: "Trận bóng đá diễn ra ở sân vận động thành phố." }
        ]
    },
    {
        title: "7.2: Directions and Transportation",
        words: [
            { english: "turn left", vietnamese: "rẽ trái", englishExample: "Turn left at the traffic lights.", vietnameseExample: "Rẽ trái ở đèn giao thông." },
            { english: "turn right", vietnamese: "rẽ phải", englishExample: "Turn right at the next corner.", vietnameseExample: "Rẽ phải ở góc tiếp theo." },
            { english: "go straight", vietnamese: "đi thẳng", englishExample: "Go straight ahead for two blocks.", vietnameseExample: "Đi thẳng qua hai dãy nhà." },
            { english: "cross the road", vietnamese: "băng qua đường", englishExample: "Be careful when you cross the road.", vietnameseExample: "Hãy cẩn thận khi băng qua đường." },
            { english: "next to", vietnamese: "bên cạnh", englishExample: "The bank is next to the post office.", vietnameseExample: "Ngân hàng nằm bên cạnh bưu điện." },
            { english: "opposite", vietnamese: "đối diện", englishExample: "The park is opposite the school.", vietnameseExample: "Công viên đối diện với trường học." },
            { english: "between", vietnamese: "ở giữa", englishExample: "The café is between the bank and the shop.", vietnameseExample: "Quán cà phê ở giữa ngân hàng và cửa hàng." },
            { english: "near", vietnamese: "gần", englishExample: "My house is near the hospital.", vietnameseExample: "Nhà tôi gần bệnh viện." },
            { english: "far from", vietnamese: "xa", englishExample: "The beach is far from our school.", vietnameseExample: "Bãi biển cách xa trường chúng tôi." },
            { english: "behind", vietnamese: "phía sau", englishExample: "The garden is behind the house.", vietnameseExample: "Khu vườn nằm sau ngôi nhà." },
            { english: "in front of", vietnamese: "phía trước", englishExample: "There's a tree in front of my house.", vietnameseExample: "Có một cái cây trước nhà tôi." },
            { english: "bus", vietnamese: "xe buýt", englishExample: "I go to school by bus.", vietnameseExample: "Tôi đi học bằng xe buýt." },
            { english: "train", vietnamese: "tàu hỏa", englishExample: "We took a train to Da Nang.", vietnameseExample: "Chúng tôi đi tàu hỏa đến Đà Nẵng." },
            { english: "plane", vietnamese: "máy bay", englishExample: "He travels by plane to Hanoi.", vietnameseExample: "Anh ấy đi Hà Nội bằng máy bay." },
            { english: "bicycle", vietnamese: "xe đạp", englishExample: "I ride my bicycle to school.", vietnameseExample: "Tôi đi học bằng xe đạp." },
            { english: "motorbike", vietnamese: "xe máy", englishExample: "My dad goes to work by motorbike.", vietnameseExample: "Bố tôi đi làm bằng xe máy." },
            { english: "car", vietnamese: "ô tô", englishExample: "They travel to the city by car.", vietnameseExample: "Họ đi đến thành phố bằng ô tô." },
            { english: "boat", vietnamese: "thuyền", englishExample: "We went to the island by boat.", vietnameseExample: "Chúng tôi đi đến đảo bằng thuyền." },
            { english: "taxi", vietnamese: "xe taxi", englishExample: "Let's take a taxi to the hotel.", vietnameseExample: "Hãy bắt taxi đến khách sạn nhé." },
            { english: "map", vietnamese: "bản đồ", englishExample: "Look at the map to find the way.", vietnameseExample: "Hãy nhìn bản đồ để tìm đường." }
        ]
    },
    {
        title: "7.3: Traveling and Holidays",
        words: [
            { english: "travel", vietnamese: "du lịch", englishExample: "I love to travel to new places.", vietnameseExample: "Tôi thích đi du lịch đến những nơi mới." },
            { english: "trip", vietnamese: "chuyến đi", englishExample: "Our class trip to Ha Long Bay was amazing.", vietnameseExample: "Chuyến đi của lớp tôi đến Vịnh Hạ Long thật tuyệt." },
            { english: "journey", vietnamese: "hành trình", englishExample: "The journey took three hours.", vietnameseExample: "Hành trình kéo dài ba tiếng." },
            { english: "holiday", vietnamese: "kỳ nghỉ", englishExample: "We always go to the beach on holidays.", vietnameseExample: "Chúng tôi luôn đi biển vào kỳ nghỉ." },
            { english: "vacation", vietnamese: "kỳ nghỉ (Mỹ)", englishExample: "They are planning a summer vacation.", vietnameseExample: "Họ đang lên kế hoạch cho kỳ nghỉ hè." },
            { english: "travel by", vietnamese: "đi bằng (phương tiện)", englishExample: "We travel by train to the north.", vietnameseExample: "Chúng tôi đi bằng tàu hỏa ra miền Bắc." },
            { english: "go sightseeing", vietnamese: "đi tham quan", englishExample: "We go sightseeing around the old town.", vietnameseExample: "Chúng tôi đi tham quan quanh phố cổ." },
            { english: "visit", vietnamese: "thăm viếng", englishExample: "I visit my grandparents every summer.", vietnameseExample: "Tôi thăm ông bà mỗi mùa hè." },
            { english: "tourist", vietnamese: "khách du lịch", englishExample: "Tourists love visiting Vietnam.", vietnameseExample: "Du khách rất thích đến Việt Nam." },
            { english: "tour guide", vietnamese: "hướng dẫn viên du lịch", englishExample: "The tour guide tells us about the city's history.", vietnameseExample: "Hướng dẫn viên kể cho chúng tôi nghe về lịch sử thành phố." },
            { english: "hotel", vietnamese: "khách sạn", englishExample: "We stayed at a nice hotel near the beach.", vietnameseExample: "Chúng tôi ở một khách sạn đẹp gần bãi biển." },
            { english: "resort", vietnamese: "khu nghỉ dưỡng", englishExample: "This resort has a beautiful swimming pool.", vietnameseExample: "Khu nghỉ dưỡng này có hồ bơi rất đẹp." },
            { english: "beach", vietnamese: "bãi biển", englishExample: "My family swims at the beach every summer.", vietnameseExample: "Gia đình tôi tắm biển mỗi mùa hè." },
            { english: "mountain", vietnamese: "ngọn núi", englishExample: "We climbed the mountain last weekend.", vietnameseExample: "Chúng tôi leo núi vào cuối tuần trước." },
            { english: "island", vietnamese: "hòn đảo", englishExample: "Phu Quoc is a famous island in Vietnam.", vietnameseExample: "Phú Quốc là một hòn đảo nổi tiếng của Việt Nam." },
            { english: "take photos", vietnamese: "chụp ảnh", englishExample: "I love to take photos when I travel.", vietnameseExample: "Tôi thích chụp ảnh khi đi du lịch." },
            { english: "pack a suitcase", vietnamese: "xếp hành lý", englishExample: "Don't forget to pack your suitcase!", vietnameseExample: "Đừng quên xếp hành lý nhé!" },
            { english: "souvenir", vietnamese: "quà lưu niệm", englishExample: "I bought some souvenirs for my friends.", vietnameseExample: "Tôi mua vài món quà lưu niệm cho bạn bè." },
            { english: "relax", vietnamese: "thư giãn", englishExample: "We relax on the beach after swimming.", vietnameseExample: "Chúng tôi thư giãn trên bãi biển sau khi tắm." },
            { english: "have fun", vietnamese: "vui chơi", englishExample: "Have fun on your holiday!", vietnameseExample: "Chúc bạn có kỳ nghỉ vui vẻ!" }
        ]
    },
    {
        title: "8.1: Weather and Seasons",
        words: [
            { english: "weather", vietnamese: "thời tiết", englishExample: "The weather is hot and sunny today.", vietnameseExample: "Thời tiết hôm nay nóng và có nắng." },
            { english: "season", vietnamese: "mùa", englishExample: "There are four seasons in a year.", vietnameseExample: "Một năm có bốn mùa." },
            { english: "spring", vietnamese: "mùa xuân", englishExample: "Flowers bloom in spring.", vietnameseExample: "Hoa nở vào mùa xuân." },
            { english: "summer", vietnamese: "mùa hè", englishExample: "We go to the beach in summer.", vietnameseExample: "Chúng tôi đi biển vào mùa hè." },
            { english: "autumn (fall)", vietnamese: "mùa thu", englishExample: "The leaves turn yellow in autumn.", vietnameseExample: "Lá cây chuyển vàng vào mùa thu." },
            { english: "winter", vietnamese: "mùa đông", englishExample: "It often snows in winter.", vietnameseExample: "Thường có tuyết rơi vào mùa đông." },
            { english: "sunny", vietnamese: "có nắng", englishExample: "It's sunny today, let's go out!", vietnameseExample: "Hôm nay trời có nắng, ra ngoài thôi!" },
            { english: "cloudy", vietnamese: "có mây", englishExample: "The sky is cloudy and grey.", vietnameseExample: "Bầu trời đầy mây và xám xịt." },
            { english: "windy", vietnamese: "có gió", englishExample: "It's too windy to ride a bike.", vietnameseExample: "Trời có gió quá, không thể đi xe đạp được." },
            { english: "rainy", vietnamese: "có mưa", englishExample: "Don't forget your umbrella, it's rainy!", vietnameseExample: "Đừng quên ô, trời đang mưa đấy!" },
            { english: "stormy", vietnamese: "có bão", englishExample: "It's stormy, so we must stay at home.", vietnameseExample: "Trời có bão, nên chúng ta phải ở nhà." },
            { english: "snowy", vietnamese: "có tuyết", englishExample: "Children love playing in snowy weather.", vietnameseExample: "Trẻ con thích chơi trong tuyết." },
            { english: "hot", vietnamese: "nóng", englishExample: "It's too hot to wear a jacket.", vietnameseExample: "Trời quá nóng để mặc áo khoác." },
            { english: "cold", vietnamese: "lạnh", englishExample: "It's cold outside, wear a coat!", vietnameseExample: "Trời lạnh bên ngoài, hãy mặc áo khoác vào!" },
            { english: "warm", vietnamese: "ấm áp", englishExample: "The weather is warm and pleasant today.", vietnameseExample: "Hôm nay thời tiết ấm áp và dễ chịu." },
            { english: "cool", vietnamese: "mát mẻ", englishExample: "It's cool in the early morning.", vietnameseExample: "Buổi sáng sớm trời mát mẻ." },
            { english: "temperature", vietnamese: "nhiệt độ", englishExample: "The temperature is 35 degrees Celsius.", vietnameseExample: "Nhiệt độ là 35 độ C." },
            { english: "forecast", vietnamese: "dự báo", englishExample: "Let's watch the weather forecast.", vietnameseExample: "Hãy xem dự báo thời tiết nhé." },
            { english: "rainbow", vietnamese: "cầu vồng", englishExample: "A rainbow appears after the rain.", vietnameseExample: "Cầu vồng xuất hiện sau cơn mưa." },
            { english: "umbrella", vietnamese: "cái ô", englishExample: "Take an umbrella, it might rain.", vietnameseExample: "Mang theo ô đi, có thể trời sẽ mưa." }
        ]
    },
    {
        title: "8.2: Natural Environment",
        words: [
            { english: "nature", vietnamese: "thiên nhiên", englishExample: "We must protect nature.", vietnameseExample: "Chúng ta phải bảo vệ thiên nhiên." },
            { english: "environment", vietnamese: "môi trường", englishExample: "Our environment is very important.", vietnameseExample: "Môi trường của chúng ta rất quan trọng." },
            { english: "forest", vietnamese: "rừng", englishExample: "Many animals live in the forest.", vietnameseExample: "Nhiều loài động vật sống trong rừng." },
            { english: "mountain", vietnamese: "núi", englishExample: "Fansipan is the highest mountain in Vietnam.", vietnameseExample: "Fansipan là ngọn núi cao nhất Việt Nam." },
            { english: "river", vietnamese: "con sông", englishExample: "The river runs through the city.", vietnameseExample: "Dòng sông chảy qua thành phố." },
            { english: "lake", vietnamese: "hồ", englishExample: "There are many fish in the lake.", vietnameseExample: "Có nhiều cá trong hồ." },
            { english: "sea", vietnamese: "biển", englishExample: "The sea water is clear and blue.", vietnameseExample: "Nước biển trong và xanh." },
            { english: "ocean", vietnamese: "đại dương", englishExample: "Whales live in the ocean.", vietnameseExample: "Cá voi sống trong đại dương." },
            { english: "island", vietnamese: "hòn đảo", englishExample: "Phu Quoc is a beautiful island.", vietnameseExample: "Phú Quốc là một hòn đảo xinh đẹp." },
            { english: "desert", vietnamese: "sa mạc", englishExample: "Camels live in the desert.", vietnameseExample: "Lạc đà sống ở sa mạc." },
            { english: "field", vietnamese: "cánh đồng", englishExample: "The farmers are working in the field.", vietnameseExample: "Những người nông dân đang làm việc trên cánh đồng." },
            { english: "hill", vietnamese: "đồi", englishExample: "The children are running up the hill.", vietnameseExample: "Bọn trẻ đang chạy lên đồi." },
            { english: "beach", vietnamese: "bãi biển", englishExample: "We like walking on the beach.", vietnameseExample: "Chúng tôi thích đi dạo trên bãi biển." },
            { english: "waterfall", vietnamese: "thác nước", englishExample: "The waterfall looks amazing!", vietnameseExample: "Thác nước trông thật tuyệt đẹp!" },
            { english: "tree", vietnamese: "cây", englishExample: "There is a big tree in front of my house.", vietnameseExample: "Có một cái cây lớn trước nhà tôi." },
            { english: "flower", vietnamese: "hoa", englishExample: "Flowers make the garden beautiful.", vietnameseExample: "Hoa làm cho khu vườn trở nên đẹp hơn." },
            { english: "grass", vietnamese: "cỏ", englishExample: "The children play on the green grass.", vietnameseExample: "Trẻ con chơi trên bãi cỏ xanh." },
            { english: "rock", vietnamese: "đá", englishExample: "Don't climb on the rocks, it's dangerous.", vietnameseExample: "Đừng leo lên những tảng đá, nguy hiểm đấy." },
            { english: "sky", vietnamese: "bầu trời", englishExample: "The sky is clear and blue today.", vietnameseExample: "Bầu trời hôm nay trong xanh." },
            { english: "land", vietnamese: "đất liền", englishExample: "Farmers work on the land to grow crops.", vietnameseExample: "Nông dân làm việc trên đất để trồng trọt." }
        ]
    },
    {
        title: "8.3: Environmental Problems and Protection",
        words: [
            { english: "pollution", vietnamese: "ô nhiễm", englishExample: "Air pollution is a big problem in cities.", vietnameseExample: "Ô nhiễm không khí là vấn đề lớn ở các thành phố." },
            { english: "air pollution", vietnamese: "ô nhiễm không khí", englishExample: "Factories cause air pollution.", vietnameseExample: "Các nhà máy gây ra ô nhiễm không khí." },
            { english: "water pollution", vietnamese: "ô nhiễm nước", englishExample: "Water pollution kills fish in the river.", vietnameseExample: "Ô nhiễm nước làm chết cá trong sông." },
            { english: "noise pollution", vietnamese: "ô nhiễm tiếng ồn", englishExample: "Traffic creates a lot of noise pollution.", vietnameseExample: "Giao thông tạo ra rất nhiều tiếng ồn." },
            { english: "litter", vietnamese: "rác (vứt bừa bãi)", englishExample: "Don't drop litter on the ground.", vietnameseExample: "Đừng vứt rác xuống đất." },
            { english: "rubbish", vietnamese: "rác thải", englishExample: "Put the rubbish in the bin.", vietnameseExample: "Hãy bỏ rác vào thùng." },
            { english: "plastic", vietnamese: "nhựa", englishExample: "Plastic waste is very harmful to the sea.", vietnameseExample: "Rác thải nhựa rất có hại cho biển." },
            { english: "waste", vietnamese: "chất thải", englishExample: "We should recycle waste materials.", vietnameseExample: "Chúng ta nên tái chế chất thải." },
            { english: "recycle", vietnamese: "tái chế", englishExample: "We can recycle paper and bottles.", vietnameseExample: "Chúng ta có thể tái chế giấy và chai." },
            { english: "reuse", vietnamese: "tái sử dụng", englishExample: "Let's reuse bags instead of throwing them away.", vietnameseExample: "Hãy tái sử dụng túi thay vì vứt đi." },
            { english: "reduce", vietnamese: "giảm thiểu", englishExample: "Reduce plastic use to protect the Earth.", vietnameseExample: "Giảm sử dụng nhựa để bảo vệ Trái Đất." },
            { english: "protect", vietnamese: "bảo vệ", englishExample: "We must protect the environment.", vietnameseExample: "Chúng ta phải bảo vệ môi trường." },
            { english: "save energy", vietnamese: "tiết kiệm năng lượng", englishExample: "Turn off the lights to save energy.", vietnameseExample: "Tắt đèn để tiết kiệm năng lượng." },
            { english: "save water", vietnamese: "tiết kiệm nước", englishExample: "Don't waste water while brushing your teeth.", vietnameseExample: "Đừng lãng phí nước khi đánh răng." },
            { english: "plant trees", vietnamese: "trồng cây", englishExample: "We plant trees around our school.", vietnameseExample: "Chúng tôi trồng cây quanh trường học." },
            { english: "pick up rubbish", vietnamese: "nhặt rác", englishExample: "Students pick up rubbish in the park.", vietnameseExample: "Học sinh nhặt rác trong công viên." },
            { english: "clean up", vietnamese: "dọn dẹp", englishExample: "Let's clean up the beach together.", vietnameseExample: "Hãy cùng nhau dọn sạch bãi biển." },
            { english: "environment protection", vietnamese: "bảo vệ môi trường", englishExample: "Environment protection is everyone's duty.", vietnameseExample: "Bảo vệ môi trường là trách nhiệm của mọi người." },
            { english: "climate change", vietnamese: "biến đổi khí hậu", englishExample: "Climate change affects our planet.", vietnameseExample: "Biến đổi khí hậu ảnh hưởng đến Trái Đất của chúng ta." },
            { english: "global warming", vietnamese: "hiện tượng nóng lên toàn cầu", englishExample: "Global warming makes the Earth hotter.", vietnameseExample: "Hiện tượng nóng lên toàn cầu khiến Trái Đất nóng hơn." }
        ]
    },
    {
        title: "9.1: Devices and Gadgets",
        words: [
            { english: "computer", vietnamese: "máy tính", englishExample: "I use my computer to do homework.", vietnameseExample: "Tôi dùng máy tính để làm bài tập." },
            { english: "laptop", vietnamese: "máy tính xách tay", englishExample: "She takes her laptop to school.", vietnameseExample: "Cô ấy mang laptop đến trường." },
            { english: "smartphone", vietnamese: "điện thoại thông minh", englishExample: "Most teenagers have a smartphone.", vietnameseExample: "Hầu hết thanh thiếu niên đều có điện thoại thông minh." },
            { english: "tablet", vietnamese: "máy tính bảng", englishExample: "He reads books on his tablet.", vietnameseExample: "Cậu ấy đọc sách trên máy tính bảng." },
            { english: "television (TV)", vietnamese: "tivi", englishExample: "We watch the news on television.", vietnameseExample: "Chúng tôi xem tin tức trên tivi." },
            { english: "radio", vietnamese: "đài radio", englishExample: "My grandparents still listen to the radio.", vietnameseExample: "Ông bà tôi vẫn nghe đài radio." },
            { english: "camera", vietnamese: "máy ảnh", englishExample: "She takes photos with her camera.", vietnameseExample: "Cô ấy chụp ảnh bằng máy ảnh của mình." },
            { english: "headphones", vietnamese: "tai nghe", englishExample: "I listen to music with my headphones.", vietnameseExample: "Tôi nghe nhạc bằng tai nghe." },
            { english: "keyboard", vietnamese: "bàn phím", englishExample: "The keyboard is used for typing.", vietnameseExample: "Bàn phím được dùng để gõ chữ." },
            { english: "mouse", vietnamese: "chuột máy tính", englishExample: "I use a wireless mouse with my laptop.", vietnameseExample: "Tôi dùng chuột không dây cho laptop." },
            { english: "printer", vietnamese: "máy in", englishExample: "The teacher prints worksheets with a printer.", vietnameseExample: "Cô giáo in bài tập bằng máy in." },
            { english: "charger", vietnamese: "sạc pin", englishExample: "Don't forget to bring your phone charger.", vietnameseExample: "Đừng quên mang theo sạc điện thoại nhé." },
            { english: "battery", vietnamese: "pin", englishExample: "The battery of my phone is low.", vietnameseExample: "Pin điện thoại của tôi sắp hết." },
            { english: "speaker", vietnamese: "loa", englishExample: "The speaker plays music loudly.", vietnameseExample: "Loa phát nhạc to." },
            { english: "screen", vietnamese: "màn hình", englishExample: "The phone screen is very bright.", vietnameseExample: "Màn hình điện thoại rất sáng." },
            { english: "remote control", vietnamese: "điều khiển từ xa", englishExample: "Where is the TV remote control?", vietnameseExample: "Cái điều khiển tivi đâu rồi?" },
            { english: "USB drive", vietnamese: "USB, ổ lưu trữ", englishExample: "I save my files on a USB drive.", vietnameseExample: "Tôi lưu tập tin của mình vào USB." },
            { english: "smartwatch", vietnamese: "đồng hồ thông minh", englishExample: "My smartwatch can count my steps.", vietnameseExample: "Đồng hồ thông minh của tôi có thể đếm bước chân." },
            { english: "earphones", vietnamese: "tai nghe nhỏ", englishExample: "I always carry earphones in my bag.", vietnameseExample: "Tôi luôn mang tai nghe trong túi." },
            { english: "microphone", vietnamese: "micro", englishExample: "The singer uses a microphone on stage.", vietnameseExample: "Ca sĩ dùng micro trên sân khấu." }
        ]
    },
    {
        title: "9.2: Using Technology",
        words: [
            { english: "turn on", vietnamese: "bật (thiết bị)", englishExample: "Please turn on the computer.", vietnameseExample: "Làm ơn bật máy tính lên." },
            { english: "turn off", vietnamese: "tắt (thiết bị)", englishExample: "Don't forget to turn off the lights.", vietnameseExample: "Đừng quên tắt đèn nhé." },
            { english: "switch on", vietnamese: "bật", englishExample: "She switches on the TV to watch cartoons.", vietnameseExample: "Cô ấy bật tivi để xem phim hoạt hình." },
            { english: "switch off", vietnamese: "tắt", englishExample: "He switches off his phone during class.", vietnameseExample: "Cậu ấy tắt điện thoại trong giờ học." },
            { english: "charge", vietnamese: "sạc pin", englishExample: "I need to charge my phone.", vietnameseExample: "Tôi cần sạc điện thoại." },
            { english: "download", vietnamese: "tải xuống", englishExample: "You can download this app for free.", vietnameseExample: "Bạn có thể tải ứng dụng này miễn phí." },
            { english: "upload", vietnamese: "tải lên", englishExample: "I uploaded my video to YouTube.", vietnameseExample: "Tôi đã tải video của mình lên YouTube." },
            { english: "click", vietnamese: "nhấn chuột", englishExample: "Click on the link to open the file.", vietnameseExample: "Nhấn vào liên kết để mở tệp." },
            { english: "type", vietnamese: "gõ, đánh máy", englishExample: "She types fast on her laptop.", vietnameseExample: "Cô ấy gõ nhanh trên laptop." },
            { english: "search", vietnamese: "tìm kiếm", englishExample: "He searches for English songs online.", vietnameseExample: "Cậu ấy tìm các bài hát tiếng Anh trên mạng." },
            { english: "connect", vietnamese: "kết nối", englishExample: "Please connect your phone to Wi-Fi.", vietnameseExample: "Hãy kết nối điện thoại của bạn với Wi-Fi." },
            { english: "install", vietnamese: "cài đặt", englishExample: "Dad installs new software on the computer.", vietnameseExample: "Bố cài phần mềm mới vào máy tính." },
            { english: "delete", vietnamese: "xóa", englishExample: "Don't delete my photos, please!", vietnameseExample: "Đừng xóa ảnh của tôi nhé!" },
            { english: "save", vietnamese: "lưu", englishExample: "Save your work before closing the program.", vietnameseExample: "Hãy lưu công việc trước khi đóng chương trình." },
            { english: "print", vietnamese: "in ra", englishExample: "I print my homework at school.", vietnameseExample: "Tôi in bài tập về nhà ở trường." },
            { english: "record", vietnamese: "ghi âm, ghi hình", englishExample: "She records her English speaking practice.", vietnameseExample: "Cô ấy ghi âm phần luyện nói tiếng Anh của mình." },
            { english: "send", vietnamese: "gửi", englishExample: "I send an email to my teacher.", vietnameseExample: "Tôi gửi email cho cô giáo." },
            { english: "receive", vietnamese: "nhận", englishExample: "I received a message from my friend.", vietnameseExample: "Tôi nhận được tin nhắn từ bạn." },
            { english: "use", vietnamese: "sử dụng", englishExample: "We use computers to study online.", vietnameseExample: "Chúng tôi sử dụng máy tính để học trực tuyến." },
            { english: "log in", vietnamese: "đăng nhập", englishExample: "You need to log in to your account.", vietnameseExample: "Bạn cần đăng nhập vào tài khoản của mình." }
        ]
    },
    {
        title: "9.3: Communication and Social Media",
        words: [
            { english: "message", vietnamese: "tin nhắn", englishExample: "I sent a message to my friend.", vietnameseExample: "Tôi đã gửi tin nhắn cho bạn tôi." },
            { english: "text", vietnamese: "nhắn tin", englishExample: "She texts her classmates every day.", vietnameseExample: "Cô ấy nhắn tin cho bạn cùng lớp mỗi ngày." },
            { english: "email", vietnamese: "thư điện tử", englishExample: "I check my email every morning.", vietnameseExample: "Tôi kiểm tra email mỗi buổi sáng." },
            { english: "chat", vietnamese: "trò chuyện", englishExample: "We chat online after school.", vietnameseExample: "Chúng tôi trò chuyện trực tuyến sau giờ học." },
            { english: "call", vietnamese: "gọi điện", englishExample: "He calls his parents every weekend.", vietnameseExample: "Cậu ấy gọi điện cho bố mẹ mỗi cuối tuần." },
            { english: "video call", vietnamese: "gọi video", englishExample: "Let's make a video call tonight.", vietnameseExample: "Hãy gọi video tối nay nhé." },
            { english: "social media", vietnamese: "mạng xã hội", englishExample: "Social media helps us stay connected.", vietnameseExample: "Mạng xã hội giúp chúng ta giữ liên lạc." },
            { english: "post", vietnamese: "đăng bài", englishExample: "She posted a new photo on Facebook.", vietnameseExample: "Cô ấy đã đăng một bức ảnh mới lên Facebook." },
            { english: "comment", vietnamese: "bình luận", englishExample: "Many people commented on my post.", vietnameseExample: "Nhiều người đã bình luận bài đăng của tôi." },
            { english: "share", vietnamese: "chia sẻ", englishExample: "I share funny videos with my friends.", vietnameseExample: "Tôi chia sẻ video hài với bạn bè." },
            { english: "follow", vietnamese: "theo dõi", englishExample: "I follow my favorite singer on Instagram.", vietnameseExample: "Tôi theo dõi ca sĩ yêu thích trên Instagram." },
            { english: "like", vietnamese: "thích (bài đăng)", englishExample: "He liked my photo yesterday.", vietnameseExample: "Hôm qua cậu ấy đã thích ảnh của tôi." },
            { english: "online", vietnamese: "trực tuyến", englishExample: "We study English online.", vietnameseExample: "Chúng tôi học tiếng Anh trực tuyến." },
            { english: "offline", vietnamese: "ngoại tuyến", englishExample: "The game can be played offline.", vietnameseExample: "Trò chơi này có thể chơi ngoại tuyến." },
            { english: "website", vietnamese: "trang web", englishExample: "This website teaches English for free.", vietnameseExample: "Trang web này dạy tiếng Anh miễn phí." },
            { english: "account", vietnamese: "tài khoản", englishExample: "You need an account to log in.", vietnameseExample: "Bạn cần có tài khoản để đăng nhập." },
            { english: "password", vietnamese: "mật khẩu", englishExample: "Don't share your password with anyone.", vietnameseExample: "Đừng chia sẻ mật khẩu của bạn với ai cả." },
            { english: "upload photo", vietnamese: "tải ảnh lên", englishExample: "She uploads photos of her pets.", vietnameseExample: "Cô ấy tải ảnh thú cưng của mình lên." },
            { english: "connect with", vietnamese: "kết nối với", englishExample: "I connect with friends all over the world.", vietnameseExample: "Tôi kết nối với bạn bè khắp thế giới." },
            { english: "emoji", vietnamese: "biểu tượng cảm xúc", englishExample: "I use emojis to show my feelings.", vietnameseExample: "Tôi dùng biểu tượng cảm xúc để thể hiện cảm xúc." }
        ]
    },
    {
        title: "10.1: Festivals and Holidays",
        words: [
            { english: "festival", vietnamese: "lễ hội", englishExample: "The Mid-Autumn Festival is my favorite festival.", vietnameseExample: "Tết Trung thu là lễ hội tôi thích nhất." },
            { english: "holiday", vietnamese: "ngày lễ", englishExample: "We don't go to school on public holidays.", vietnameseExample: "Chúng tôi không đi học vào các ngày lễ." },
            { english: "New Year", vietnamese: "Năm mới", englishExample: "People celebrate New Year with fireworks.", vietnameseExample: "Mọi người đón Năm mới bằng pháo hoa." },
            { english: "Tet", vietnamese: "Tết Nguyên Đán", englishExample: "Tet is the most important festival in Vietnam.", vietnameseExample: "Tết là lễ hội quan trọng nhất ở Việt Nam." },
            { english: "Christmas", vietnamese: "Giáng sinh", englishExample: "We decorate the Christmas tree at home.", vietnameseExample: "Chúng tôi trang trí cây Giáng sinh ở nhà." },
            { english: "Easter", vietnamese: "Lễ Phục sinh", englishExample: "Children get chocolate eggs on Easter Day.", vietnameseExample: "Trẻ em nhận trứng sô-cô-la vào Lễ Phục sinh." },
            { english: "Halloween", vietnamese: "Lễ Halloween", englishExample: "Kids wear costumes on Halloween.", vietnameseExample: "Trẻ em mặc trang phục hóa trang vào Halloween." },
            { english: "Mid-Autumn Festival", vietnamese: "Tết Trung thu", englishExample: "Children carry lanterns during the Mid-Autumn Festival.", vietnameseExample: "Trẻ em rước đèn trong Tết Trung thu." },
            { english: "Independence Day", vietnamese: "Ngày Quốc khánh", englishExample: "We watch fireworks on Independence Day.", vietnameseExample: "Chúng tôi xem pháo hoa vào Ngày Quốc khánh." },
            { english: "Lunar New Year", vietnamese: "Tết Âm lịch", englishExample: "Families get together during Lunar New Year.", vietnameseExample: "Các gia đình sum họp trong dịp Tết Âm lịch." },
            { english: "Teacher's Day", vietnamese: "Ngày Nhà giáo", englishExample: "We give flowers to our teachers on Teacher's Day.", vietnameseExample: "Chúng tôi tặng hoa cho thầy cô vào Ngày Nhà giáo." },
            { english: "Valentine's Day", vietnamese: "Ngày Lễ tình nhân", englishExample: "Couples give gifts on Valentine's Day.", vietnameseExample: "Các cặp đôi tặng quà vào Ngày Lễ tình nhân." },
            { english: "National Day", vietnamese: "Ngày Quốc gia", englishExample: "We raise the flag on National Day.", vietnameseExample: "Chúng tôi treo cờ vào Ngày Quốc gia." },
            { english: "Lantern Festival", vietnamese: "Lễ hội đèn lồng", englishExample: "The Lantern Festival is very colorful.", vietnameseExample: "Lễ hội đèn lồng rất nhiều màu sắc." },
            { english: "music festival", vietnamese: "lễ hội âm nhạc", englishExample: "There's a big music festival in the park.", vietnameseExample: "Có một lễ hội âm nhạc lớn trong công viên." },
            { english: "fireworks", vietnamese: "pháo hoa", englishExample: "Fireworks light up the sky at midnight.", vietnameseExample: "Pháo hoa thắp sáng bầu trời vào nửa đêm." },
            { english: "parade", vietnamese: "cuộc diễu hành", englishExample: "The parade goes through the main street.", vietnameseExample: "Cuộc diễu hành đi qua con phố chính." },
            { english: "celebration", vietnamese: "sự kỷ niệm", englishExample: "We have a big celebration for our school's birthday.", vietnameseExample: "Chúng tôi tổ chức lễ kỷ niệm lớn cho sinh nhật trường." },
            { english: "public holiday", vietnamese: "ngày nghỉ lễ", englishExample: "The office is closed on public holidays.", vietnameseExample: "Văn phòng đóng cửa vào các ngày nghỉ lễ." },
            { english: "tradition", vietnamese: "truyền thống", englishExample: "Eating bánh chưng is a Tet tradition.", vietnameseExample: "Ăn bánh chưng là một truyền thống ngày Tết." }
        ]
    },
    {
        title: "10.2: Cultural Activities and Customs",
        words: [
            { english: "culture", vietnamese: "văn hóa", englishExample: "Vietnamese culture is very rich and diverse.", vietnameseExample: "Văn hóa Việt Nam rất phong phú và đa dạng." },
            { english: "custom", vietnamese: "phong tục", englishExample: "Taking off shoes before entering the house is a common custom.", vietnameseExample: "Cởi giày trước khi vào nhà là phong tục phổ biến." },
            { english: "tradition", vietnamese: "truyền thống", englishExample: "It's our family tradition to eat together on Sundays.", vietnameseExample: "Gia đình tôi có truyền thống ăn cơm cùng nhau vào Chủ nhật." },
            { english: "ceremony", vietnamese: "nghi lễ", englishExample: "The opening ceremony was very exciting.", vietnameseExample: "Lễ khai mạc thật sôi động." },
            { english: "ritual", vietnamese: "nghi thức", englishExample: "Lighting incense is a traditional ritual.", vietnameseExample: "Thắp hương là một nghi thức truyền thống." },
            { english: "festival", vietnamese: "lễ hội", englishExample: "People wear traditional clothes at the festival.", vietnameseExample: "Mọi người mặc trang phục truyền thống trong lễ hội." },
            { english: "costume", vietnamese: "trang phục", englishExample: "Her traditional costume is beautiful.", vietnameseExample: "Trang phục truyền thống của cô ấy thật đẹp." },
            { english: "performance", vietnamese: "buổi biểu diễn", englishExample: "We watched a lion dance performance.", vietnameseExample: "Chúng tôi xem một buổi múa lân." },
            { english: "dance", vietnamese: "điệu nhảy, múa", englishExample: "The children learn a traditional dance.", vietnameseExample: "Trẻ em học một điệu múa truyền thống." },
            { english: "song", vietnamese: "bài hát", englishExample: "They sang a folk song together.", vietnameseExample: "Họ cùng hát một bài dân ca." },
            { english: "art", vietnamese: "nghệ thuật", englishExample: "The museum has many pieces of modern art.", vietnameseExample: "Bảo tàng có nhiều tác phẩm nghệ thuật hiện đại." },
            { english: "painting", vietnamese: "bức tranh", englishExample: "She bought a painting of a Vietnamese village.", vietnameseExample: "Cô ấy mua một bức tranh về làng quê Việt Nam." },
            { english: "sculpture", vietnamese: "điêu khắc", englishExample: "The temple has many stone sculptures.", vietnameseExample: "Ngôi đền có nhiều bức tượng điêu khắc bằng đá." },
            { english: "respect", vietnamese: "sự tôn trọng", englishExample: "We show respect to our elders.", vietnameseExample: "Chúng ta thể hiện sự tôn trọng với người lớn tuổi." },
            { english: "belief", vietnamese: "tín ngưỡng, niềm tin", englishExample: "Each culture has its own beliefs.", vietnameseExample: "Mỗi nền văn hóa có những tín ngưỡng riêng." },
            { english: "worship", vietnamese: "thờ cúng", englishExample: "They worship their ancestors every month.", vietnameseExample: "Họ thờ cúng tổ tiên mỗi tháng." },
            { english: "offering", vietnamese: "lễ vật", englishExample: "The family prepares offerings for the altar.", vietnameseExample: "Gia đình chuẩn bị lễ vật cho bàn thờ." },
            { english: "pagoda", vietnamese: "ngôi chùa", englishExample: "People go to the pagoda to pray on Tet holiday.", vietnameseExample: "Mọi người đi chùa cầu nguyện vào dịp Tết." },
            { english: "temple", vietnamese: "đền, miếu", englishExample: "The temple is crowded during the festival.", vietnameseExample: "Ngôi đền đông người trong dịp lễ hội." },
            { english: "greeting", vietnamese: "lời chào", englishExample: "Bowing is a polite greeting in some cultures.", vietnameseExample: "Cúi đầu là một cách chào lịch sự trong một số nền văn hóa." }
        ]
    },
    {
        title: "10.3: Cultural Diversity and Global Traditions",
        words: [
            { english: "diversity", vietnamese: "sự đa dạng", englishExample: "Cultural diversity makes our world beautiful.", vietnameseExample: "Sự đa dạng văn hóa làm cho thế giới của chúng ta trở nên đẹp hơn." },
            { english: "difference", vietnamese: "sự khác biệt", englishExample: "There are many cultural differences between countries.", vietnameseExample: "Có nhiều sự khác biệt văn hóa giữa các quốc gia." },
            { english: "similar", vietnamese: "giống nhau", englishExample: "Vietnamese and Thai food are quite similar.", vietnameseExample: "Ẩm thực Việt Nam và Thái Lan khá giống nhau." },
            { english: "respect", vietnamese: "tôn trọng", englishExample: "We should respect all cultures.", vietnameseExample: "Chúng ta nên tôn trọng mọi nền văn hóa." },
            { english: "learn about", vietnamese: "tìm hiểu về", englishExample: "I want to learn about Japanese traditions.", vietnameseExample: "Tôi muốn tìm hiểu về các truyền thống của Nhật Bản." },
            { english: "celebrate", vietnamese: "tổ chức, kỷ niệm", englishExample: "People celebrate Thanksgiving in the USA.", vietnameseExample: "Người Mỹ tổ chức Lễ Tạ ơn." },
            { english: "tradition", vietnamese: "truyền thống", englishExample: "Every country has its own traditions.", vietnameseExample: "Mỗi quốc gia đều có những truyền thống riêng." },
            { english: "custom", vietnamese: "phong tục", englishExample: "It's a custom to bow when greeting in Japan.", vietnameseExample: "Ở Nhật, cúi đầu khi chào là một phong tục." },
            { english: "festival", vietnamese: "lễ hội", englishExample: "The Songkran festival in Thailand is very fun.", vietnameseExample: "Lễ hội té nước Songkran ở Thái Lan rất vui." },
            { english: "religion", vietnamese: "tôn giáo", englishExample: "Religion plays an important role in many cultures.", vietnameseExample: "Tôn giáo đóng vai trò quan trọng trong nhiều nền văn hóa." },
            { english: "language", vietnamese: "ngôn ngữ", englishExample: "Learning new languages helps us understand other cultures.", vietnameseExample: "Học ngôn ngữ mới giúp ta hiểu các nền văn hóa khác." },
            { english: "nationality", vietnamese: "quốc tịch", englishExample: "There are people of many nationalities in my city.", vietnameseExample: "Có nhiều người thuộc các quốc tịch khác nhau trong thành phố tôi." },
            { english: "costume", vietnamese: "trang phục truyền thống", englishExample: "The kimono is a traditional Japanese costume.", vietnameseExample: "Kimono là trang phục truyền thống của Nhật Bản." },
            { english: "food culture", vietnamese: "văn hóa ẩm thực", englishExample: "Food culture shows a country's lifestyle.", vietnameseExample: "Văn hóa ẩm thực thể hiện lối sống của một quốc gia." },
            { english: "handshake", vietnamese: "bắt tay", englishExample: "A handshake is a common greeting in many countries.", vietnameseExample: "Bắt tay là cách chào phổ biến ở nhiều quốc gia." },
            { english: "bow", vietnamese: "cúi chào", englishExample: "People in Korea bow to show respect.", vietnameseExample: "Người Hàn Quốc cúi chào để thể hiện sự tôn trọng." },
            { english: "exchange", vietnamese: "trao đổi", englishExample: "Students join cultural exchange programs.", vietnameseExample: "Học sinh tham gia các chương trình trao đổi văn hóa." },
            { english: "world heritage", vietnamese: "di sản thế giới", englishExample: "Ha Long Bay is a world heritage site.", vietnameseExample: "Vịnh Hạ Long là một di sản thế giới." },
            { english: "international", vietnamese: "quốc tế", englishExample: "We have an international cultural fair at school.", vietnameseExample: "Trường tôi có hội chợ văn hóa quốc tế." },
            { english: "global", vietnamese: "toàn cầu", englishExample: "English is a global language.", vietnameseExample: "Tiếng Anh là ngôn ngữ toàn cầu." }
        ]
    }
];

// From components/Icons.tsx
const SpeakerIcon = ({ className = "h-8 w-8" }) => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
  }))
);

const TrophyIcon = () => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-16 w-16",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
  React.createElement("path", { d: "M17.92,3.39a1,1,0,0,0-1.33-.22L12,6.1,7.41,3.17a1,1,0,0,0-1.33.22L2.1,9.45a1,1,0,0,0,0,1.1l2.1,6.28a1,1,0,0,0,1,.67H14.8a1,1,0,0,0,1-.67l2.1-6.28a1,1,0,0,0,0-1.1ZM13,16H7L5.5,12,3,9.4,4.5,7.4l3,2.25a1,1,0,0,0,1,0l3-2.25L13,9.4,14.5,12Z" }))
);

const PlayIcon = ({className = "h-5 w-5"}) => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
  React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z", clipRule: "evenodd" }))
);

const ChevronDownIcon = ({className = "h-5 w-5"}) => (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 20 20", fill: "currentColor" },
        React.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" })
    )
);

// From components/WrongAnswersModal.tsx
const WrongAnswersModal = ({ isOpen, onClose, mistakes, onPracticeMistakes }) => {
  if (!isOpen) {
    return null;
  }

  return (
    React.createElement("div", {
      className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50",
      onClick: onClose
    },
    React.createElement("div", {
      className: "bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col",
      onClick: (e) => e.stopPropagation()
    },
    React.createElement("div", { className: "p-6 border-b border-gray-200 sticky top-0 bg-white" },
      React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, "Words to Review"),
      React.createElement("p", { className: "text-gray-500" }, "Here are the words you had trouble with.")
    ),
    React.createElement("div", { className: "p-6 overflow-y-auto" },
      mistakes.length === 0 ? (
        React.createElement("p", { className: "text-center text-gray-500 py-8" }, "No mistakes yet. Great job!")
      ) : (
        React.createElement("ul", { className: "divide-y divide-gray-200" },
          mistakes.map((mistake, index) => (
            React.createElement("li", {
              key: index,
              className: "py-4 flex flex-col items-start select-none",
              onContextMenu: (e) => e.preventDefault()
            },
            React.createElement("div", { className: "flex justify-between items-center w-full" },
              React.createElement("span", { className: "text-lg text-gray-800 font-medium" }, mistake.word.english),
              React.createElement("span", { className: "text-gray-600" }, mistake.word.vietnamese)
            ),
            mistake.sentenceErrorCount > 0 && (
              React.createElement("p", { className: "text-sm font-semibold text-red-600 mt-1" }, `Sentence mistakes: ${mistake.sentenceErrorCount}`)
            ),
            mistake.word.englishExample && (
              React.createElement("p", { className: "text-base text-gray-500 mt-1 italic" }, `e.g., "${mistake.word.englishExample}"`)
            ))
          ))
        )
      )
    ),
    React.createElement("div", { className: "p-6 border-t border-gray-200 sticky bottom-0 bg-white space-y-2" },
      React.createElement("button", {
        onClick: onPracticeMistakes,
        disabled: mistakes.length === 0,
        className: "w-full p-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      }, `Practice Mistakes (${mistakes.length})`),
      React.createElement("button", {
        onClick: onClose,
        className: "w-full p-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
      }, "Close")
    )))
  );
};

// From components/GameSummary.tsx
const GameSummary = ({ score, total, onShowWrongAnswers, onNextTopic, onReturnToMenu, onPracticeMistakes, mistakesCount }) => {
  return (
    React.createElement("div", { className: "flex flex-col items-center justify-center min-h-screen p-4" },
      React.createElement("div", { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200" },
        React.createElement("div", { className: "flex justify-center text-sky-400 mb-4" },
          React.createElement(TrophyIcon)
        ),
        React.createElement("h1", { className: "text-3xl font-bold text-sky-600 mb-2" }, "Topic Complete!"),
        React.createElement("p", { className: "text-gray-600 mb-6" }, "Great job! Here's how you did."),
        React.createElement("div", { className: "my-8" },
          React.createElement("p", { className: "text-lg text-gray-800" }, "Your Score"),
          React.createElement("p", { className: "text-6xl font-bold text-green-500" },
            score,
            React.createElement("span", { className: "text-3xl text-gray-500" }, `/${total}`)
          )
        ),
        React.createElement("div", { className: "space-y-3" },
          React.createElement("button", { onClick: onNextTopic, className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200" }, "Continue to Next Topic"),
          mistakesCount > 0 && React.createElement("button", { onClick: onPracticeMistakes, className: "w-full p-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-transform hover:scale-105 transform duration-200" }, `Practice ${mistakesCount} Mistake(s)`),
          React.createElement("button", { onClick: onShowWrongAnswers, className: "w-full p-4 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-transform hover:scale-105 transform duration-200" }, "Review Mistakes"),
          React.createElement("button", { onClick: onReturnToMenu, className: "w-full p-3 bg-transparent text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors" }, "Back to Main Menu")
        )
      )
    )
  );
};

// From components/Game.tsx
const Game = ({ topic, onReturnToMenu, onNextTopic, onStartPractice, selectedVoiceURI }) => {
  const words = useMemo(() => [...topic.words].sort(() => 0.5 - Math.random()), [topic]);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [showWrongAnswersModal, setShowWrongAnswersModal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gameStage, setGameStage] = useState('word');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const inputRef = useRef(null);
  const currentWord = words[currentWordIndex];

  const speak = useCallback((text, onEndCallback = null) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (selectedVoiceURI) {
        const allVoices = window.speechSynthesis.getVoices();
        const selectedVoice = allVoices.find(voice => voice.voiceURI === selectedVoiceURI);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        }
      } else {
        utterance.lang = 'en-US';
      }

      if (onEndCallback) {
        utterance.onend = onEndCallback;
      }
      window.speechSynthesis.speak(utterance);
    } else if (onEndCallback) {
      onEndCallback();
    }
  }, [selectedVoiceURI]);

  useEffect(() => {
    if (currentWord) {
      const textToSpeak = gameStage === 'word' ? currentWord.english : (currentWord.englishExample || '');

      if (textToSpeak) {
        setIsPreviewVisible(true);
        const playSecondTimeAndHide = () => {
          speak(textToSpeak, () => {
            setIsPreviewVisible(false);
            inputRef.current?.focus();
          });
        };
        speak(textToSpeak, playSecondTimeAndHide);
      } else {
        setIsPreviewVisible(false);
        inputRef.current?.focus();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentWord, gameStage, speak]);

  useEffect(() => {
      if (feedback) {
          const timer = setTimeout(() => setFeedback(null), 2500);
          return () => clearTimeout(timer);
      }
  }, [feedback]);

  const normalizeSentence = (str) => str.trim().toLowerCase().replace(/[.,!?]/g, '').replace(/[\u2018\u2019']/g, "'");

  const handleNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
      setAttempts(1);
      setShowHint(false);
      setFeedback(null);
      setGameStage('word');
    } else {
      setIsFinished(true);
    }
  }, [currentWordIndex, words.length]);
  
  const handleTransitionToSentence = useCallback(() => {
    if (currentWord?.englishExample) {
        setGameStage('sentence');
        setUserInput('');
        setFeedback(null);
        setAttempts(1);
        setShowHint(false);
    } else {
        handleNextWord();
    }
  }, [currentWord, handleNextWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || feedback || !currentWord) return;

    if (gameStage === 'word') {
        const isCorrect = normalizeSentence(userInput) === normalizeSentence(currentWord.english);
        if (isCorrect) {
          setFeedback({type: 'correct', message: 'Correct!', example: currentWord.englishExample});
          if (attempts === 1) {
            setScore(prev => prev + 1);
          }
          setTimeout(handleTransitionToSentence, 2500);
        } else {
          setFeedback({type: 'incorrect', message: 'Incorrect, try again!'});
          if (attempts === 1) {
              setWrongAnswers(prev => {
                  if (!prev.some(m => m.word.english === currentWord.english)) {
                      return [...prev, { word: currentWord, sentenceErrorCount: 0 }];
                  }
                  return prev;
              });
          }
          setAttempts(prev => prev + 1);
          if (attempts >= 1) {
            setShowHint(true);
          }
        }
    } else { // gameStage === 'sentence'
        if (!currentWord.englishExample) return;
        
        const isCorrect = normalizeSentence(userInput) === normalizeSentence(currentWord.englishExample);
        if (isCorrect) {
            setFeedback({ type: 'correct', message: 'Excellent!' });
            setTimeout(handleNextWord, 1000);
        } else {
            setFeedback({ type: 'incorrect', message: 'Not quite, listen again!' });
            setAttempts(prev => prev + 1);
            if (attempts >= 1) {
              setShowHint(true);
            }
            setWrongAnswers(prev => {
                const existingMistakeIndex = prev.findIndex(m => m.word.english === currentWord.english);
                if (existingMistakeIndex > -1) {
                    const updatedMistakes = [...prev];
                    updatedMistakes[existingMistakeIndex].sentenceErrorCount += 1;
                    return updatedMistakes;
                } else {
                    return [...prev, { word: currentWord, sentenceErrorCount: 1 }];
                }
            });
        }
    }
  };

  const handleListenAgain = useCallback(() => {
      if (!currentWord) return;
      const textToSpeak = gameStage === 'word' ? currentWord.english : (currentWord.englishExample || '');
      if (textToSpeak) {
          setIsPreviewVisible(true);
          speak(textToSpeak, () => {
              setIsPreviewVisible(false);
              inputRef.current?.focus();
          });
      }
  }, [currentWord, gameStage, speak]);

  const handlePracticeMistakes = () => {
    if (wrongAnswers.length > 0) {
      setShowWrongAnswersModal(false);
      onStartPractice(wrongAnswers);
    }
  };

  if (isFinished) {
    return React.createElement(GameSummary, { 
      score: score,
      total: words.length, 
      onShowWrongAnswers: () => setShowWrongAnswersModal(true), 
      onNextTopic: onNextTopic, 
      onReturnToMenu: onReturnToMenu,
      onPracticeMistakes: handlePracticeMistakes,
      mistakesCount: wrongAnswers.length 
    });
  }

  if (!currentWord) {
    return React.createElement("div", { className: "text-center p-8" }, "Loading topic...");
  }
  
  const getInputBorderColor = () => {
      if (!feedback) return 'border-gray-300 focus:border-sky-500';
      return feedback.type === 'correct' ? 'border-green-500 animate-pulse-correct' : 'border-red-500 animate-pulse-incorrect';
  }

  const progressPercentage = ((currentWordIndex) / words.length) * 100;

  return (
    React.createElement("div", { className: "flex flex-col items-center justify-center min-h-screen p-4" },
      React.createElement("div", { className: "w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-gray-200" },
        React.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2.5 absolute top-0 left-0" },
          React.createElement("div", { className: "bg-sky-400 h-2.5 rounded-full", style: { width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' } })
        ),
        React.createElement("div", { className: "absolute top-4 left-4" },
          React.createElement("button", { onClick: onReturnToMenu, className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, "← Change Topic")
        ),
        React.createElement("div", { className: "absolute top-4 right-4" },
          React.createElement("button", { onClick: () => setShowWrongAnswersModal(true), className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, `Mistakes (${wrongAnswers.length})`)
        ),
        React.createElement("div", { className: "text-center mt-12" },
          React.createElement("h2", { className: "text-2xl font-bold text-sky-600 mb-2" }, topic.title),
          React.createElement("p", { className: "text-gray-500" }, `Word ${currentWordIndex + 1} of ${words.length} • Score: ${score}`)
        ),
        React.createElement("div", { className: "my-8 text-center min-h-[160px] flex flex-col justify-center items-center select-none", onContextMenu: (e) => e.preventDefault() },
          isPreviewVisible ? (
            gameStage === 'word' ? (
              React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-4xl md:text-5xl font-semibold text-sky-700 mb-2 animate-pulse" }, currentWord.english),
                React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.vietnamese})`)
              )
            ) : (
              React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-2xl text-sky-700 mb-2 italic animate-pulse" }, `"${currentWord.englishExample}"`),
                React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.vietnameseExample})`)
              )
            )
          ) : (
            gameStage === 'word' ? (
              React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-4xl md:text-5xl font-semibold text-gray-900 mb-2" }, currentWord.vietnamese),
                currentWord.vietnameseExample && React.createElement("p", { className: "text-xl text-gray-500 mt-2 italic" }, `"${currentWord.vietnameseExample}"`)
              )
            ) : (
              React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-2xl font-semibold text-gray-800 mb-2" }, "Listen and type the sentence:"),
                currentWord.vietnameseExample && React.createElement("p", { className: "text-2xl text-gray-700 mb-2 italic" }, `"${currentWord.vietnameseExample}"`),
                React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.english} - ${currentWord.vietnamese})`)
              )
            )
          ),
          React.createElement("button", { onClick: handleListenAgain, className: "text-gray-500 hover:text-sky-500 transition-colors p-2 rounded-full active:scale-90 transform mt-2" },
            React.createElement(SpeakerIcon)
          )
        ),
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
          React.createElement("input", {
            ref: inputRef,
            type: "text",
            value: userInput,
            onChange: (e) => setUserInput(e.target.value),
            placeholder: gameStage === 'word' ? "Type the English word..." : "Type the English sentence...",
            className: `w-full p-4 text-center text-lg bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 ${getInputBorderColor()}`,
            autoCapitalize: "none",
            autoComplete: "off",
            autoCorrect: "off"
          }),
          React.createElement("button", { type: "submit", className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:scale-100" }, "Submit")
        ),
        React.createElement("div", { className: "mt-4 min-h-[48px] flex items-center justify-center" },
          showHint && !feedback && (
            React.createElement("div", { className: "relative" },
              React.createElement("button", {
                onMouseDown: () => setIsHintVisible(true),
                onMouseUp: () => setIsHintVisible(false),
                onTouchStart: () => setIsHintVisible(true),
                onTouchEnd: () => setIsHintVisible(false),
                className: "px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              }, "Hold for Hint"),
              isHintVisible && (
                React.createElement("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg border border-gray-300 shadow-lg z-10 select-none" },
                  React.createElement("p", { className: "text-sky-700 font-mono whitespace-nowrap" }, gameStage === 'word' ? currentWord.english : currentWord.englishExample)
                )
              )
            )
          ),
          feedback && (
            React.createElement("div", { className: "text-center" },
              React.createElement("p", { className: `text-lg font-semibold ${feedback.type === "correct" ? "text-green-500" : "text-red-500"}` },
                feedback.message
              ),
              feedback.example && React.createElement("p", { className: "text-lg text-gray-500 mt-1 italic" }, `e.g., "${feedback.example}"`)
            )
          )
        )
      ),
      React.createElement(WrongAnswersModal, { 
        isOpen: showWrongAnswersModal, 
        onClose: () => setShowWrongAnswersModal(false), 
        mistakes: wrongAnswers,
        onPracticeMistakes: handlePracticeMistakes 
      })
    )
  );
};

// From components/WelcomeScreen.tsx
const WelcomeScreen = ({ onNameSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return (
        React.createElement("div", { className: "flex flex-col items-center justify-center min-h-screen p-4 text-center" },
            React.createElement("div", { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200" },
                React.createElement("h1", { className: "text-4xl font-bold text-sky-600 mb-2" }, "Ôn tập từ vựng GHK1 RO7"),
                React.createElement("p", { className: "text-gray-600 mb-8" }, "Nhập tên của bạn để bắt đầu!"),
                React.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                    React.createElement("input", {
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "Tên của bạn",
                        className: "w-full p-4 text-center text-lg bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
                        maxLength: 20
                    }),
                    React.createElement("button", {
                        type: "submit",
                        disabled: !name.trim(),
                        className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                    }, "Bắt đầu")
                )
            )
        )
    );
};

// From components/TopicSelector.tsx
const VoiceSelector = ({ voices, selectedVoiceURI, onVoiceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);

  const handlePreviewVoice = (e, voice) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance("Hello, this is a test.");
    utterance.voice = voice;
    utterance.lang = voice.lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectVoice = (voice) => {
    onVoiceChange(voice.voiceURI);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  if (voices.length === 0) return null;

  return (
    React.createElement("div", { className: "relative w-full max-w-xs mx-auto", ref: wrapperRef },
      React.createElement("button", {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-sky-500",
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen
      },
      React.createElement("span", { className: "flex items-center" },
          React.createElement(SpeakerIcon, { className: "h-6 w-6 text-gray-500" }),
          React.createElement("span", { className: "ml-3 truncate text-gray-700" }, selectedVoice ? selectedVoice.name : "Select a voice")
      ),
      React.createElement(ChevronDownIcon, { className: `h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}` })),

      isOpen && (
        React.createElement("ul", {
          className: "absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",
          tabIndex: -1,
          role: "listbox"
        },
        voices.map((voice) => (
          React.createElement("li", {
            key: voice.voiceURI,
            className: "text-gray-900 cursor-pointer select-none group",
            role: "option",
            "aria-selected": voice.voiceURI === selectedVoiceURI,
            onClick: () => handleSelectVoice(voice)
          },
          React.createElement("div", { className: "flex items-center justify-between py-2 pl-3 pr-2 group-hover:bg-sky-100" },
            React.createElement("span", { className: `font-normal block truncate ${voice.voiceURI === selectedVoiceURI ? 'font-semibold' : 'font-normal'}` }, `${voice.name} (${voice.lang})`),
            React.createElement("button", { 
              onClick: (e) => handlePreviewVoice(e, voice),
              className: "p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500",
              "aria-label": `Preview voice ${voice.name}`
            },
              React.createElement(PlayIcon, { className: "h-5 w-5" }))
          ))
        )))
      )
    )
  );
};

const topicColors = [
  'bg-rose-100 border-rose-300 hover:bg-rose-200 text-rose-800 focus:ring-rose-500',
  'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-800 focus:ring-blue-500',
  'bg-cyan-100 border-cyan-300 hover:bg-cyan-200 text-cyan-800 focus:ring-cyan-500',
  'bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-800 focus:ring-amber-500',
  'bg-violet-100 border-violet-300 hover:bg-violet-200 text-violet-800 focus:ring-violet-500',
  'bg-fuchsia-100 border-fuchsia-300 hover:bg-fuchsia-200 text-fuchsia-800 focus:ring-fuchsia-500',
  'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-800 focus:ring-emerald-500',
  'bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-800 focus:ring-sky-500',
  'bg-lime-100 border-lime-300 hover:bg-lime-200 text-lime-800 focus:ring-lime-500',
  'bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-800 focus:ring-orange-500',
  'bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-800 focus:ring-teal-500',
  'bg-indigo-100 border-indigo-300 hover:bg-indigo-200 text-indigo-800 focus:ring-indigo-500',
  'bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-800 focus:ring-pink-500',
  'bg-yellow-100 border-yellow-300 hover:bg-yellow-200 text-yellow-800 focus:ring-yellow-500',
  'bg-green-100 border-green-300 hover:bg-green-200 text-green-800 focus:ring-green-500',
];

const TopicSelector = ({ playerName, onSelectTopic, voices, selectedVoiceURI, onVoiceChange }) => {
  return (
    React.createElement("div", { className: "flex flex-col items-center min-h-screen p-4" },
      React.createElement("div", { className: "w-full max-w-6xl text-center py-8" },
        React.createElement("h1", { className: "text-3xl md:text-4xl font-bold text-gray-800 mb-2" }, `Welcome, ${playerName}!`),
        React.createElement("p", { className: "text-lg text-gray-600 mb-6" }, "Choose a topic to begin your challenge."),
        
        React.createElement("div", { className: "mb-8" },
          React.createElement(VoiceSelector, { 
            voices: voices,
            selectedVoiceURI: selectedVoiceURI,
            onVoiceChange: onVoiceChange
          })
        ),

        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" },
          vocabularyData.map((topic, index) => (
            React.createElement("button", {
              key: index,
              onClick: () => onSelectTopic(topic),
              className: `p-4 rounded-lg shadow-md border hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${topicColors[index % topicColors.length]}`
            },
            React.createElement("h2", { className: "text-lg font-semibold" }, topic.title),
            React.createElement("p", { className: "mt-1 opacity-80" }, `${topic.words.length} words`))
          ))
        )
      )
    )
  );
};

// From App.tsx
const App = () => {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('playerName') || '');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicIndex, setTopicIndex] = useState(null);
  
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(() => localStorage.getItem('selectedVoiceURI'));

  useEffect(() => {
    const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
            .filter(voice => voice.lang.startsWith('en-'));
        setVoices(availableVoices);

        const savedVoiceURI = localStorage.getItem('selectedVoiceURI');
        if (savedVoiceURI && availableVoices.some(v => v.voiceURI === savedVoiceURI)) {
            setSelectedVoiceURI(savedVoiceURI);
        } else if (availableVoices.length > 0) {
            const defaultVoice = availableVoices.find(v => v.lang === 'en-US') || availableVoices.find(v => v.lang === 'en-GB') || availableVoices[0];
            if (defaultVoice) {
                setSelectedVoiceURI(defaultVoice.voiceURI);
                localStorage.setItem('selectedVoiceURI', defaultVoice.voiceURI);
            }
        }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = useCallback((voiceURI) => {
    setSelectedVoiceURI(voiceURI);
    localStorage.setItem('selectedVoiceURI', voiceURI);
  }, []);

  const handleNameSubmit = useCallback((name) => {
    localStorage.setItem('playerName', name);
    setPlayerName(name);
  }, []);

  const handleSelectTopic = useCallback((topic) => {
    const index = vocabularyData.findIndex(t => t.title === topic.title);
    setCurrentTopic(topic);
    setTopicIndex(index);
  }, []);
  
  const handleReturnToMenu = useCallback(() => {
      setCurrentTopic(null);
      setTopicIndex(null);
  }, []);

  const handleNextTopic = useCallback(() => {
    if (topicIndex !== null && topicIndex >= 0 && topicIndex < vocabularyData.length - 1) {
        const nextIndex = topicIndex + 1;
        setCurrentTopic(vocabularyData[nextIndex]);
        setTopicIndex(nextIndex);
    } else {
        handleReturnToMenu();
    }
  }, [topicIndex, handleReturnToMenu]);

  const handleStartPractice = useCallback((mistakes) => {
    if (mistakes.length > 0) {
        const practiceTopic = {
            title: "Practice Mistakes",
            words: mistakes.map(mistake => mistake.word)
        };
        setCurrentTopic(practiceTopic);
        setTopicIndex(-1);
    }
  }, []);

  if (!playerName) {
    return React.createElement(WelcomeScreen, { onNameSubmit: handleNameSubmit });
  }

  if (!currentTopic) {
    return (
      React.createElement(TopicSelector, { 
        playerName: playerName, 
        onSelectTopic: handleSelectTopic,
        voices: voices,
        selectedVoiceURI: selectedVoiceURI,
        onVoiceChange: handleVoiceChange 
      })
    );
  }

  return (
    React.createElement(Game, { 
      key: currentTopic.title,
      topic: currentTopic, 
      onReturnToMenu: handleReturnToMenu, 
      onNextTopic: handleNextTopic,
      onStartPractice: handleStartPractice,
      selectedVoiceURI: selectedVoiceURI
    })
  );
};

// From index.tsx
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
