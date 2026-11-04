/* 
   JavaScript & jQuery: Hệ thống Trắc nghiệm Hành vi & Tư duy Định hướng IT (SJT Weighted Matrix)
   Thiết kế theo chuẩn Situational Judgment Test (SJT) — Đa trọng số & Xáo trộn vị trí đáp án
*/

$(document).ready(function () {

    // 1. BỘ 10 CÂU HỎI TÌNH HUỐNG HÀNH VI (KHÔNG LỘ TỪ KHÓA CÔNG CỤ, XÁO TRỘN VỊ TRÍ A/B/C/D)
    // Mỗi phương án có:
    // - primary: Trục năng lực chính (+3.0 * weight)
    // - secondary: Trục năng lực giao thoa (+0.85 * weight)
    // - insight: Đặc điểm hành vi cá nhân rút ra từ lựa chọn đó
    const quizQuestions = [
        {
            weight: 1.05,
            title: "Khi dùng thử một ứng dụng mới vừa tải về, điều gì làm bạn xóa app ngay trong 1 phút đầu tiên?",
            options: [
                {
                    letter: "A",
                    text: "Phải mò mẫm qua quá nhiều bước mới hiểu cách dùng, bố cục rối làm mình thấy mệt.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Đề cao sự trực quan và luồng trải nghiệm không gây ma sát cho người dùng"
                },
                {
                    letter: "B",
                    text: "Chuyển trang bị giật khựng, khung hình lệch lạc, cảm giác vuốt chạm thiếu mượt mà.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Nhạy cảm với chất lượng hiển thị và độ mượt của tương tác trực tiếp"
                },
                {
                    letter: "C",
                    text: "Đang thao tác thì báo lỗi kết nối, tải dữ liệu chậm hoặc mất thông tin vừa nhập.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Ưu tiên tính ổn định, tốc độ xử lý và độ tin cậy của hệ thống ngầm"
                },
                {
                    letter: "D",
                    text: "Nội dung gợi ý trên trang chủ hoàn toàn lệch pha, không hiểu gì về sở thích của mình.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Kỳ vọng cao vào khả năng cá nhân hóa và độ thông minh của dữ liệu"
                }
            ]
        },
        {
            weight: 1.20,
            title: "Khi cả nhóm được giao làm một đồ án mới tinh từ con số 0, bạn thường chủ động xung phong làm việc gì đầu tiên?",
            options: [
                {
                    letter: "A",
                    text: "Vạch ra cấu trúc lưu trữ, chia luồng xử lý xem dữ liệu đi từ đâu đến đâu cho chặt chẽ.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Có thói quen xây dựng khung sườn logic vững chắc trước khi bắt tay vào chi tiết"
                },
                {
                    letter: "B",
                    text: "Tìm kiếm số liệu thực tế, khảo sát các xu hướng và phân tích xem bài toán có khả thi không.",
                    primary: "data",
                    secondary: "uiux",
                    insight: "Luôn bắt đầu dự án bằng việc phân tích số liệu và bằng chứng thực tế"
                },
                {
                    letter: "C",
                    text: "Bắt tay dựng ngay một bản chạy thử trên màn hình để cả nhóm nhìn thấy hình hài sản phẩm.",
                    primary: "frontend",
                    secondary: "backend",
                    insight: "Thích biến ý tưởng trên giấy thành sản phẩm hiển thị sống động nhanh nhất có thể"
                },
                {
                    letter: "D",
                    text: "Phác thảo hành trình của người dùng, vẽ sơ đồ các màn hình để thống nhất trải nghiệm.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Có tư duy định hình bức tranh tổng thể từ góc nhìn người sử dụng"
                }
            ]
        },
        {
            weight: 1.30,
            title: "Giả sử sản phẩm của nhóm bị người dùng phàn nàn là \"khó mua hàng\", phản xạ đầu tiên của bạn để tìm nguyên nhân là gì?",
            options: [
                {
                    letter: "A",
                    text: "Thống kê tỷ lệ khách thoát trang ở từng bước xem chính xác bao nhiêu % rớt ở khâu nào.",
                    primary: "data",
                    secondary: "uiux",
                    insight: "Chẩn đoán vấn đề bằng con số thống kê và tỷ lệ chuyển đổi thực chứng"
                },
                {
                    letter: "B",
                    text: "Ngồi quan sát một người dùng thật thao tác thử xem họ bị khựng lại hay bối rối ở đâu.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Thấu cảm sâu sắc qua việc quan sát hành vi và tâm lý thực tế của con người"
                },
                {
                    letter: "C",
                    text: "Kiểm tra lại lịch sử giao dịch và luồng xử lý đơn hàng xem có trường hợp nào bị nghẽn không.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Truy vết nguyên nhân tận gốc thông qua luồng xử lý hệ thống và nhật ký dữ liệu"
                },
                {
                    letter: "D",
                    text: "Mở ứng dụng trên nhiều thiết bị khác nhau xem nút bấm hay biểu mẫu có bị lỗi hiển thị không.",
                    primary: "frontend",
                    secondary: "backend",
                    insight: "Kiểm chứng tỉ mỉ sự tương tác trực tiếp trên từng thiết bị và màn hình"
                }
            ]
        },
        {
            weight: 1.10,
            title: "Khi sắp xếp góc học tập hoặc tài liệu cá nhân trong máy tính, phong cách của bạn là gì?",
            options: [
                {
                    letter: "A",
                    text: "Mọi thứ phải trực quan, bày biện đẹp mắt, nhìn vào có cảm hứng làm việc ngay.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Coi trọng tính thẩm mỹ hiển thị và cảm hứng thị giác trong không gian làm việc"
                },
                {
                    letter: "B",
                    text: "Phân cấp thư mục theo quy tắc đặt tên chuẩn chỉnh, tối ưu để truy xuất nhanh nhất.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Tư duy tổ chức hệ thống quy củ, đề cao hiệu suất truy xuất và trật tự cấu trúc"
                },
                {
                    letter: "C",
                    text: "Sắp xếp theo tần suất sử dụng: cái gì hay dùng để ngay tầm tay, tối giản hóa thao tác thừa.",
                    primary: "uiux",
                    secondary: "backend",
                    insight: "Tối ưu hóa công thái học và sự tiện lợi trong từng thao tác thường ngày"
                },
                {
                    letter: "D",
                    text: "Gắn nhãn phân loại, lưu trữ đầy đủ lịch sử để khi cần có thể lọc và tổng hợp lại ngay.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Thói quen phân loại có hệ thống phục vụ việc tra cứu và tổng hợp thông tin"
                }
            ]
        },
        {
            weight: 1.25,
            title: "Trong một buổi thuyết trình bảo vệ đồ án trên lớp, phần nào bạn tự tin đảm nhận nhất?",
            options: [
                {
                    letter: "A",
                    text: "Kể câu chuyện vì sao nhóm thiết kế sản phẩm này và nó giải quyết nỗi đau gì cho người dùng.",
                    primary: "uiux",
                    secondary: "data",
                    insight: "Khả năng truyền tải giá trị sản phẩm thông qua sự đồng cảm với người dùng"
                },
                {
                    letter: "B",
                    text: "Trực tiếp điều khiển bản Demo, thao tác mượt mà các tính năng trên màn hình chiếu.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Tự tin thể hiện chất lượng hoàn thiện bề mặt và trải nghiệm tương tác trực tiếp"
                },
                {
                    letter: "C",
                    text: "Trình bày biểu đồ tăng trưởng, kết quả khảo sát và các con số chứng minh hiệu quả.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Thuyết phục người nghe bằng số liệu phân tích, biểu đồ và dẫn chứng định lượng"
                },
                {
                    letter: "D",
                    text: "Giải thích kiến trúc hoạt động bên dưới và trả lời các câu hỏi hóc búa về mặt kỹ thuật.",
                    primary: "backend",
                    secondary: "frontend",
                    insight: "Bản lĩnh vững vàng khi giải quyết các câu hỏi về logic vận hành và cấu trúc kỹ thuật"
                }
            ]
        },
        {
            weight: 1.15,
            title: "Khi chơi một tựa game chiến thuật hoặc quản lý, bạn thường bị cuốn hút bởi yếu tố nào nhất?",
            options: [
                {
                    letter: "A",
                    text: "Tối ưu hóa dây chuyền tài nguyên, tự động hóa để hệ thống tự vận hành trơn tru.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Đam mê tự động hóa quy trình và tối ưu hiệu suất vận hành của hệ thống"
                },
                {
                    letter: "B",
                    text: "Hiệu ứng kỹ năng mãn nhãn, chuyển động nhân vật mượt mà và âm thanh sống động.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Bị thu hút mạnh bởi hiệu ứng chuyển động và phản hồi thị giác thời gian thực"
                },
                {
                    letter: "C",
                    text: "So sánh bảng chỉ số sát thương, tính toán xác suất để tìm ra lối lên đồ tối ưu nhất.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Thích giải bài toán tối ưu thông qua việc phân tích chỉ số và xác suất"
                },
                {
                    letter: "D",
                    text: "Bản đồ và bảng điều khiển được bố trí thông minh, giúp ra lệnh nhanh mà không bị rối.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Đánh giá cao sự tinh gọn và hợp lý của giao diện điều khiển"
                }
            ]
        },
        {
            weight: 1.35,
            title: "Khoảnh khắc nào trong quá trình làm bài tập khiến bạn cảm thấy \"đã\" và thỏa mãn nhất?",
            options: [
                {
                    letter: "A",
                    text: "Khi phát hiện ra một quy luật thú vị ẩn sau hàng ngàn dòng dữ liệu tưởng chừng hỗn độn.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Tìm thấy niềm vui khi khai phá được tri thức mới từ dữ liệu phức tạp"
                },
                {
                    letter: "B",
                    text: "Khi đưa cho một người bạn dùng thử và họ thao tác trơn tru ngay mà không cần mình chỉ dẫn.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Hạnh phúc khi thiết kế của mình mang lại sự dễ dàng tự nhiên cho người khác"
                },
                {
                    letter: "C",
                    text: "Khi vừa sửa xong đoạn mã và thấy giao diện trên màn hình biến đổi đẹp lung linh đúng ý.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Động lực lớn đến từ việc nhìn thấy thành quả thị giác hiện lên tức thì"
                },
                {
                    letter: "D",
                    text: "Khi xử lý xong một luồng nghiệp vụ cực kỳ phức tạp, chạy thử 100 lần đều nhanh và đúng tuyệt đối.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Thỏa mãn cao độ khi chinh phục được các bài toán logic hóc búa và đạt độ chính xác tuyệt đối"
                }
            ]
        },
        {
            weight: 1.18,
            title: "Nếu phải cải tiến chiếc máy bán nước tự động ở sân trường, bạn sẽ ưu tiên nâng cấp điều gì?",
            options: [
                {
                    letter: "A",
                    text: "Thêm màn hình cảm ứng nhạy, hiệu ứng chọn lon nước sinh động và bắt mắt hơn.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Luôn muốn nâng cấp chất lượng hiển thị và cảm giác tương tác hiện đại"
                },
                {
                    letter: "B",
                    text: "Ghi nhận lịch sử mua hàng theo giờ và thời tiết để dự báo loại nước nào sắp hết mà nhập thêm.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Tư duy dự báo thông minh dựa trên dữ liệu lịch sử và bối cảnh thực tế"
                },
                {
                    letter: "C",
                    text: "Nâng cấp bộ xử lý thanh toán QR và cơ chế trả hàng để không bao giờ bị nuốt tiền hay kẹt lon.",
                    primary: "backend",
                    secondary: "frontend",
                    insight: "Đặt sự an toàn giao dịch và tính toàn vẹn của quy trình xử lý lên hàng đầu"
                },
                {
                    letter: "D",
                    text: "Bố trí lại khe lấy nước và khu vực quét mã ở tầm cao vừa vặn để sinh viên không phải cúi khom lưng.",
                    primary: "uiux",
                    secondary: "data",
                    insight: "Tinh tế nhận ra những bất tiện nhỏ nhất trong trải nghiệm thực tế của người dùng"
                }
            ]
        },
        {
            weight: 1.28,
            title: "Khi làm việc nhóm, mọi người thường tìm đến bạn để nhờ cậy việc gì nhất?",
            options: [
                {
                    letter: "A",
                    text: "Nhờ xem giúp bố cục trang trình bày sao cho thuận mắt, dễ nhìn và chuyên nghiệp.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Được tin tưởng nhờ con mắt thẩm mỹ và khả năng sắp xếp thông tin dễ hiểu"
                },
                {
                    letter: "B",
                    text: "Nhờ gỡ rối những đoạn logic phức tạp hoặc thiết kế luồng xử lý sao cho không bị sót trường hợp.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Là chỗ dựa của nhóm khi cần tư duy logic chặt chẽ và bao quát các trường hợp biên"
                },
                {
                    letter: "C",
                    text: "Nhờ tổng hợp số liệu, lập bảng biểu so sánh và rút ra kết luận từ kết quả thu thập được.",
                    primary: "data",
                    secondary: "uiux",
                    insight: "Có thế mạnh tổng hợp thông tin rời rạc thành kết luận sắc bén"
                },
                {
                    letter: "D",
                    text: "Nhờ biến bản phác thảo ý tưởng thành sản phẩm chạy thật, có hiệu ứng chỉn chu để đem đi báo cáo.",
                    primary: "frontend",
                    secondary: "backend",
                    insight: "Nổi bật với khả năng hiện thực hóa ý tưởng thành giao diện hoàn chỉnh"
                }
            ]
        },
        {
            weight: 1.38,
            title: "Nhìn về 3 năm tới, hình ảnh chuyên gia nào dưới đây khiến bạn muốn hướng tới nhất?",
            options: [
                {
                    letter: "A",
                    text: "Kiến trúc sư hệ thống đứng sau các nền tảng lớn, đảm bảo hàng triệu giao dịch diễn ra an toàn mỗi giây.",
                    primary: "backend",
                    secondary: "data",
                    insight: "Khát vọng làm chủ các hệ thống quy mô lớn, chịu tải cao và bảo mật vững chắc"
                },
                {
                    letter: "B",
                    text: "Kỹ sư giao diện sáng tạo, tạo ra những sản phẩm web/app mượt mà khiến ai chạm vào cũng ấn tượng.",
                    primary: "frontend",
                    secondary: "uiux",
                    insight: "Theo đuổi sự hoàn hảo trong kỹ thuật hiển thị và trải nghiệm tương tác người dùng"
                },
                {
                    letter: "C",
                    text: "Chuyên gia thiết kế sản phẩm, thấu hiểu tâm lý con người để định hình những ứng dụng triệu người mê.",
                    primary: "uiux",
                    secondary: "frontend",
                    insight: "Định hướng trở thành người kiến tạo trải nghiệm sản phẩm lấy con người làm trung tâm"
                },
                {
                    letter: "D",
                    text: "Chuyên gia dữ liệu & AI, xây dựng các mô hình thông minh giúp dự đoán tương lai và tự động hóa quyết định.",
                    primary: "data",
                    secondary: "backend",
                    insight: "Hướng tới việc làm chủ dữ liệu lớn và trí tuệ nhân tạo để giải quyết bài toán tương lai"
                }
            ]
        }
    ];

    // 2. HỒ SƠ CHUYÊN MÔN CỦA 4 TRỤC NĂNG LỰC
    const baseProfiles = {
        frontend: {
            code: "Frontend",
            name: "Frontend Engineer (Kỹ Sư Giao Diện Tương Tác)",
            shortName: "Frontend",
            slogan: "\"Nơi kỹ thuật lập trình giao thoa với nghệ thuật hiển thị và cảm giác chạm.\"",
            desc: "Bạn sở hữu tư duy trực quan nhạy bén và yêu thích việc nhìn thấy sản phẩm thành hình ngay trước mắt. Điểm mạnh của bạn là biến các ý tưởng trừu tượng thành giao diện sống động, phản hồi tức thì và mượt mà trên mọi thiết bị.",
            synergyNote: "Khả năng hiện thực hóa giao diện (Frontend) giúp bạn không chỉ dừng ở ý tưởng mà luôn tự tay làm ra sản phẩm chạy thực tế.",
            blindSpot: "Đôi khi vì quá chăm chút cho phần nhìn và hiệu ứng bề mặt, bạn có thể ít để tâm đến việc tối ưu cấu trúc cơ sở dữ liệu hoặc phân tích số liệu thống kê sâu. Khi làm nhóm, hãy phối hợp chặt với Backend và Data.",
            tech: ["HTML5 / CSS3 Modern", "JavaScript / TypeScript", "React / Next.js / Vue", "Tailwind CSS / Bootstrap", "Web Animation & DOM", "Responsive Performance"]
        },
        backend: {
            code: "Backend",
            name: "Backend & System Engineer (Kỹ Sư Hệ Thống & Logic)",
            shortName: "Backend",
            slogan: "\"Kiến trúc sư thầm lặng vận hành toàn bộ cỗ máy logic và luồng dữ liệu phía sau.\"",
            desc: "Bạn có tư duy cấu trúc chặt chẽ, thích đào sâu vào bản chất hoạt động bên dưới hơn là vẻ hào nhoáng bên ngoài. Bạn tỏa sáng khi giải quyết các bài toán về luồng nghiệp vụ phức tạp, thiết kế cơ sở dữ liệu, bảo mật và tối ưu tốc độ hệ thống.",
            synergyNote: "Tư duy hệ thống và logic chặt chẽ (Backend) tạo nên nền móng kỹ thuật vững vàng cho mọi sản phẩm bạn tham gia.",
            blindSpot: "Vì ưu tiên tính đúng đắn của hệ thống kỹ thuật, đôi lúc bạn có thể làm ra những tính năng chạy rất chuẩn nhưng giao diện hơi khô khan hoặc khó hiểu với người dùng phổ thông. Hãy lắng nghe thêm góc nhìn từ UI/UX.",
            tech: ["Node.js / C# (.NET) / Java", "SQL Server / PostgreSQL", "RESTful API & GraphQL", "Authentication & Security", "Docker & Redis", "System Architecture"]
        },
        uiux: {
            code: "UI / UX",
            name: "Product UI/UX Designer (Thiết Kế Trải Nghiệm Sản Phẩm)",
            shortName: "UI/UX Design",
            slogan: "\"Cầu nối thấu cảm xóa bỏ khoảng cách giữa tâm lý con người và công nghệ.\"",
            desc: "Bạn có khả năng quan sát tinh tế và luôn đặt câu hỏi \"Người dùng sẽ cảm thấy thế nào?\". Thay vì lao vào code ngay, bạn ưu tiên tìm hiểu nỗi đau thực sự của người sử dụng, sắp xếp bố cục thông tin hợp lý và tối giản hóa từng thao tác.",
            synergyNote: "Sự thấu cảm người dùng và tư duy thiết kế (UI/UX) giúp sản phẩm của bạn luôn thân thiện, có hồn và đi đúng nhu cầu thực tế.",
            blindSpot: "Khi quá tập trung vào sự hoàn hảo của trải nghiệm lý tưởng, bạn có thể gặp rào cản về giới hạn kỹ thuật hệ thống hoặc độ phức tạp khi xử lý dữ liệu ngầm. Việc hiểu thêm về quy trình code sẽ giúp bản thiết kế của bạn khả thi hơn.",
            tech: ["Figma & Prototyping", "User Journey & Flow", "Design System", "Wireframing", "Usability Testing", "Information Architecture"]
        },
        data: {
            code: "Data & AI",
            name: "Data & AI Specialist (Chuyên Gia Dữ Liệu & Trí Tuệ Nhân Tạo)",
            shortName: "Data & AI",
            slogan: "\"Tìm kiếm quy luật ẩn giấu sau những con số và huấn luyện hệ thống thông minh.\"",
            desc: "Bạn là người có tư duy phân tích định lượng sắc sảo, chỉ bị thuyết phục bởi số liệu thực chứng và xác suất. Bạn hứng thú với việc khai phá dữ liệu, tìm kiếm quy luật hành vi và xây dựng các thuật toán dự báo hoặc tích hợp AI.",
            synergyNote: "Khả năng phân tích định lượng (Data/AI) giúp mọi quyết định phát triển sản phẩm của bạn đều có cơ sở khoa học và độ chính xác cao.",
            blindSpot: "Những con số và mô hình thuật toán đôi khi cần được truyền tải qua một giao diện gần gũi và dễ hiểu hơn với người dùng cuối. Kết hợp thêm tư duy hiển thị trực quan sẽ giúp kết quả phân tích của bạn phát huy tối đa giá trị.",
            tech: ["Python (Pandas / NumPy)", "SQL & Data Warehouse", "Data Visualization (BI)", "Machine Learning", "Statistical Analysis", "LLM & AI Integration"]
        }
    };

    // 3. HỒ SƠ KẾT HỢP ĐÔI (KHI 2 TRỤC DẪN ĐẦU SÁT NHAU <= 3%)
    const hybridProfiles = {
        "frontend+backend": {
            code: "Fullstack",
            title: "Fullstack Product Developer (Frontend + Backend)",
            slogan: "\"Tự tay xây dựng trọn vẹn sản phẩm từ giao diện người dùng đến kiến trúc máy chủ.\"",
            desc: "Chỉ số của bạn cân bằng giữa tư duy hiển thị (Frontend) và tư duy hệ thống (Backend). Bạn có lợi thế lớn khi hiểu rõ cả hai đầu chiến tuyến: vừa biết làm giao diện mượt mà, vừa tự thiết kế được API và cơ sở dữ liệu phía sau.",
            tech: ["HTML5 / CSS3 / TypeScript", "React / Next.js", "Node.js / C# (.NET)", "RESTful API", "PostgreSQL / SQL Server", "Docker & Git"]
        },
        "frontend+uiux": {
            code: "UI Engineer",
            title: "Design Engineer / Creative Frontend (UI/UX + Frontend)",
            slogan: "\"Thiết kế bằng tư duy thẩm mỹ, hiện thực hóa bằng từng dòng code chuẩn xác.\"",
            desc: "Bạn kết hợp nhuần nhuyễn giữa con mắt thiết kế trải nghiệm (UI/UX) và kỹ năng lập trình giao diện (Frontend). Bạn chính là hình mẫu Design Engineer hiện đại: tự phác thảo được giao diện đẹp và tự code thành sản phẩm hoàn chỉnh.",
            tech: ["Figma & Design System", "HTML5 / CSS3 chuyên sâu", "JavaScript / React", "Tailwind CSS", "Micro-interactions", "Responsive UX"]
        },
        "backend+data": {
            code: "Data & Backend",
            title: "Data Platform & AI Backend Engineer (Backend + Data)",
            slogan: "\"Xây dựng hạ tầng hệ thống vững chắc cho dữ liệu lớn và trí tuệ nhân tạo.\"",
            desc: "Bạn mạnh đồng thời ở kiến trúc máy chủ (Backend) lẫn phân tích dữ liệu (Data/AI). Đây là tổ hợp lý tưởng để theo đuổi hướng Data Engineering, xây dựng đường ống dữ liệu (Pipeline) hoặc tích hợp các mô hình AI vào hệ thống thực tế.",
            tech: ["Python (FastAPI / Django)", "SQL & Data Warehouse", "ETL / Data Pipeline", "RESTful API", "Machine Learning Ops", "Docker & Cloud"]
        },
        "frontend+data": {
            code: "AI & Frontend",
            title: "AI Application & Data Visualization Engineer (Frontend + Data)",
            slogan: "\"Biến dữ liệu phức tạp và mô hình thông minh thành giao diện trực quan sống động.\"",
            desc: "Sự giao thoa giữa kỹ năng hiển thị (Frontend) và tư duy số liệu (Data/AI) giúp bạn cực kỳ phù hợp với mảng trực quan hóa dữ liệu (Dashboard, BI) hoặc phát triển giao diện cho các ứng dụng AI thế hệ mới.",
            tech: ["React / TypeScript", "Python", "D3.js / Chart.js", "Interactive Dashboard", "SQL & Data API", "LLM / AI SDK"]
        },
        "backend+uiux": {
            code: "Product Arch",
            title: "Product Engineer & System Analyst (Backend + UI/UX)",
            slogan: "\"Nối liền hành trình trải nghiệm người dùng với cấu trúc nghiệp vụ hệ thống.\"",
            desc: "Bạn vừa thấu hiểu tâm lý người dùng (UI/UX), vừa nắm rõ logic vận hành của hệ thống (Backend). Góc nhìn toàn cục này giúp bạn thiết kế ra những sản phẩm vừa dễ dùng ở bề nổi, vừa chặt chẽ về mặt dữ liệu ở bên dưới.",
            tech: ["Product & System Design", "Figma & User Flow", "Database Modeling", "RESTful API", "Business Analysis (BA)", "Backend Development"]
        },
        "uiux+data": {
            code: "Growth UX",
            title: "Data-Driven Product Designer / Growth UX (UI/UX + Data)",
            slogan: "\"Tối ưu hóa trải nghiệm sản phẩm dựa trên sự thấu cảm và số liệu thực chứng.\"",
            desc: "Bạn không thiết kế theo cảm tính mà kết hợp sự nhạy bén về trải nghiệm (UI/UX) với tư duy phân tích số liệu (Data). Bạn biết dùng dữ liệu hành vi và tỷ lệ chuyển đổi để liên tục cải tiến sản phẩm.",
            tech: ["Figma & Prototyping", "UX Research", "Product Analytics", "A/B Testing", "SQL & Biểu đồ thống kê", "Conversion Optimization"]
        }
    };

    // 4. HÀM LÀM TRÒN PHẦN TRĂM CHUẨN XÁC (TỔNG LUÔN BẰNG 100%, KHÔNG BỊ BẰNG NHAU MÁY MÓC)
    function normalizePercentages(rawScores) {
        const keys = ["frontend", "backend", "uiux", "data"];
        const total = keys.reduce((sum, k) => sum + rawScores[k], 0);
        if (total === 0) return { frontend: 25, backend: 25, uiux: 25, data: 25 };

        const exact = keys.map(k => ({
            key: k,
            raw: rawScores[k],
            val: (rawScores[k] / total) * 100
        }));

        const floored = {};
        let currentSum = 0;
        exact.forEach(item => {
            floored[item.key] = Math.floor(item.val);
            currentSum += floored[item.key];
            item.remainder = item.val - floored[item.key];
        });

        // Cộng phần dư cho các nhóm có phần thập phân lớn nhất để tổng đúng 100%
        exact.sort((a, b) => b.remainder - a.remainder);
        let diff = 100 - currentSum;
        for (let i = 0; i < diff; i++) {
            floored[exact[i].key]++;
        }

        return floored;
    }

    // 5. HÀM PHÂN TÍCH CHÂN DUNG ĐA CHIỀU TỪ MA TRẬN ĐIỂM SỐ & LỊCH SỬ CÂU TRẢ LỜI
    function analyzeUserDossier(userAnswersObj) {
        const rawScores = { frontend: 0, backend: 0, uiux: 0, data: 0 };
        const chosenInsights = [];

        quizQuestions.forEach((q, idx) => {
            const ans = userAnswersObj[idx];
            if (!ans) return;

            const w = q.weight;
            rawScores[ans.primary] += 3.0 * w;
            rawScores[ans.secondary] += 0.85 * w;

            chosenInsights.push({
                qIndex: idx + 1,
                primary: ans.primary,
                weight: w,
                insight: ans.insight
            });
        });

        const pctMap = normalizePercentages(rawScores);
        const order = ["frontend", "backend", "uiux", "data"];

        // Sắp xếp theo điểm thô chính xác (rawScores) để phân định thứ hạng thực chất
        const ranked = order
            .map(key => ({
                key,
                raw: rawScores[key],
                pct: pctMap[key]
            }))
            .sort((a, b) => b.raw - a.raw);

        const first = ranked[0];
        const second = ranked[1];
        const lowest = ranked[3];

        const firstProfile = baseProfiles[first.key];
        const secondProfile = baseProfiles[second.key];
        const lowestProfile = baseProfiles[lowest.key];

        // Lọc ra 3 đặc điểm hành vi nổi bật nhất ứng với nhóm dẫn đầu của người dùng
        const matchingInsights = chosenInsights
            .filter(item => item.primary === first.key || item.primary === second.key)
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 3);

        let resultTitle = "";
        let resultCode = "";
        let resultSlogan = "";
        let resultDesc = "";
        let resultTech = [];

        // Khoảng cách % giữa nhóm 1 và nhóm 2
        const gapPct = first.pct - second.pct;

        // TRƯỜNG HỢP 1: Hai nhóm dẫn đầu bám cực sát nhau (chênh lệch <= 3%) -> Vai trò Lai (Hybrid Role)
        if (gapPct <= 3) {
            const pairKeys = order.filter(k => k === first.key || k === second.key);
            const pairId = pairKeys.join("+");
            const hybrid = hybridProfiles[pairId];

            resultCode = hybrid.code;
            resultTitle = hybrid.title;
            resultSlogan = hybrid.slogan;
            resultDesc = `${hybrid.desc} (Chỉ số kết hợp: ${firstProfile.shortName} ${first.pct}% & ${secondProfile.shortName} ${second.pct}%).`;
            resultTech = hybrid.tech;
        }
        // TRƯỜNG HỢP 2: Có 1 hướng chủ đạo rõ ràng + 1 thế mạnh bổ trợ tốt (chênh lệch 4% - 14% và nhóm 2 >= 24%)
        else if (gapPct <= 14 && second.pct >= 24) {
            resultCode = `${firstProfile.code}+`;
            resultTitle = `${firstProfile.name}`;
            resultSlogan = firstProfile.slogan;
            resultDesc = `${firstProfile.desc} Điểm thú vị trong hồ sơ của bạn là bên cạnh trục chính ${firstProfile.shortName} (${first.pct}%), bạn còn có trục bổ trợ rất mạnh ở mảng ${secondProfile.shortName} (${second.pct}%). ${secondProfile.synergyNote}`;
            resultTech = [
                ...firstProfile.tech.slice(0, 4),
                ...secondProfile.tech.slice(0, 2)
            ];
        }
        // TRƯỜNG HỢP 3: Chuyên sâu vượt trội ở 1 lĩnh vực (Specialist)
        else {
            resultCode = firstProfile.code;
            resultTitle = firstProfile.name;
            resultSlogan = firstProfile.slogan;
            resultDesc = `${firstProfile.desc} Với tỷ lệ nổi trội (${first.pct}%), phản xạ tự nhiên của bạn nghiêng hẳn về chuyên môn sâu trong mảng ${firstProfile.shortName}, kết hợp một phần góc nhìn từ ${secondProfile.shortName} (${second.pct}%).`;
            resultTech = firstProfile.tech;
        }

        // Góc khuất / Điểm mù dựa trên nhóm thấp điểm nhất
        const blindSpotMsg = `Chỉ số thấp nhất của bạn hiện tại là ${lowestProfile.shortName} (${lowest.pct}%). ${firstProfile.blindSpot}`;

        return {
            code: resultCode,
            title: resultTitle,
            slogan: resultSlogan,
            desc: resultDesc,
            tech: resultTech,
            pctMap: pctMap,
            insights: matchingInsights,
            blindSpot: blindSpotMsg
        };
    }

    let currentQuestionIndex = 0;
    const userAnswers = {}; // Lưu { index: optionObject }
    const totalQuestions = quizQuestions.length;

    // =========================================================================
    // 5.5 HỆ THỐNG BACKGROUND LƯỚI KIẾN TRÚC VUÔNG GÓC ĐỘNG (ORTHOGONAL CANVAS)
    // Không dùng bất kỳ vòng tròn bán kính nào — 100% hình học vuông góc 90 độ
    // =========================================================================
    const canvas = document.getElementById('bgGridCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const GRID_SIZE = 48;
    let cw = 0, ch = 0;
    const activeCells = new Map(); // Lưu các ô vuông sáng lên khi di chuột
    const traces = [];             // Các tia mực chạy vuông góc 90 độ trên đường kẻ lưới

    function resizeCanvas() {
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        cw = window.innerWidth;
        ch = window.innerHeight;
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createOrthogonalTrace(startCol, startRow, isBurst = false) {
        const cols = Math.ceil(cw / GRID_SIZE);
        const rows = Math.ceil(ch / GRID_SIZE);
        const col = startCol !== undefined ? startCol : Math.floor(Math.random() * cols);
        const row = startRow !== undefined ? startRow : Math.floor(Math.random() * rows);
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const x = col * GRID_SIZE;
        const y = row * GRID_SIZE;

        return {
            x,
            y,
            dx: dir.dx,
            dy: dir.dy,
            speed: isBurst ? 3.2 : (1.4 + Math.random() * 1.1),
            history: [{ x, y }],
            maxLength: isBurst ? 220 : 165,
            stepsSinceTurn: 0,
            life: 1,
            fading: false,
            isBurst
        };
    }

    // Phóng các tia vuông góc từ khu vực trung tâm khi người dùng chọn đáp án / chuyển câu
    function triggerGridBurst() {
        if (!ctx) return;
        const centerCol = Math.round((cw * 0.5) / GRID_SIZE);
        const centerRow = Math.round((ch * 0.45) / GRID_SIZE);
        const offsets = [
            { c: -6, r: -3, dx: -1, dy: 0 },
            { c: 6, r: -3, dx: 1, dy: 0 },
            { c: -6, r: 3, dx: 0, dy: 1 },
            { c: 6, r: 3, dx: 0, dy: -1 }
        ];
        offsets.forEach(off => {
            const t = createOrthogonalTrace(centerCol + off.c, centerRow + off.r, true);
            t.dx = off.dx;
            t.dy = off.dy;
            traces.push(t);
        });
    }

    if (ctx) {
        resizeCanvas();
        $(window).on('resize', resizeCanvas);

        // Khởi tạo 7 tia dẫn luồng chạy vuông góc liên tục trên mặt giấy
        for (let i = 0; i < 7; i++) {
            traces.push(createOrthogonalTrace());
        }

        // Sự kiện jQuery mousemove: Tô sáng ô vuông kiến trúc ngay dưới con trỏ chuột
        $(window).on('mousemove', function (e) {
            const col = Math.floor(e.clientX / GRID_SIZE);
            const row = Math.floor(e.clientY / GRID_SIZE);
            const key = `${col},${row}`;
            activeCells.set(key, { col, row, alpha: 0.14 });
        });

        function renderBackgroundFrame() {
            ctx.clearRect(0, 0, cw, ch);

            // 1. Vẽ các ô vuông phản hồi theo chuột (Interactive Grid Cells)
            activeCells.forEach((cell, key) => {
                const x = cell.col * GRID_SIZE;
                const y = cell.row * GRID_SIZE;
                ctx.fillStyle = `rgba(22, 78, 58, ${cell.alpha})`;
                ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
                ctx.strokeStyle = `rgba(22, 78, 58, ${cell.alpha * 1.9})`;
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 0.5, y + 0.5, GRID_SIZE - 1, GRID_SIZE - 1);

                cell.alpha *= 0.94;
                if (cell.alpha < 0.006) {
                    activeCells.delete(key);
                }
            });

            // 2. Vẽ hệ lưới kiến trúc vuông góc (Orthogonal Drafting Grid)
            ctx.strokeStyle = 'rgba(20, 20, 19, 0.065)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x <= cw; x += GRID_SIZE) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, ch);
            }
            for (let y = 0; y <= ch; y += GRID_SIZE) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(cw, y + 0.5);
            }
            ctx.stroke();

            // 3. Vẽ dấu chữ thập vuông góc (+) tại mỗi giao điểm 2 ô lưới (96px)
            ctx.strokeStyle = 'rgba(22, 78, 58, 0.24)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let x = GRID_SIZE; x < cw; x += GRID_SIZE * 2) {
                for (let y = GRID_SIZE; y < ch; y += GRID_SIZE * 2) {
                    ctx.moveTo(x - 4, y + 0.5);
                    ctx.lineTo(x + 5, y + 0.5);
                    ctx.moveTo(x + 0.5, y - 4);
                    ctx.lineTo(x + 0.5, y + 5);
                }
            }
            ctx.stroke();

            // 4. Cập nhật và vẽ các tia dẫn luồng vuông góc 90 độ (Orthogonal Traces)
            for (let i = traces.length - 1; i >= 0; i--) {
                const t = traces[i];
                const prevX = t.x;
                const prevY = t.y;
                t.x += t.dx * t.speed;
                t.y += t.dy * t.speed;

                // Kiểm tra khi tia đi qua ngã tư giao điểm lưới để rẽ nhánh 90 độ
                const crossedCol = Math.floor(prevX / GRID_SIZE) !== Math.floor(t.x / GRID_SIZE);
                const crossedRow = Math.floor(prevY / GRID_SIZE) !== Math.floor(t.y / GRID_SIZE);

                if (crossedCol || crossedRow) {
                    t.stepsSinceTurn++;
                    if (t.stepsSinceTurn >= 2 && Math.random() < 0.38) {
                        t.x = Math.round(t.x / GRID_SIZE) * GRID_SIZE;
                        t.y = Math.round(t.y / GRID_SIZE) * GRID_SIZE;
                        t.history.push({ x: t.x, y: t.y });
                        // Rẽ vuông góc 90 độ (đổi trục X <-> Y)
                        const sign = Math.random() < 0.5 ? 1 : -1;
                        if (t.dx !== 0) {
                            t.dx = 0;
                            t.dy = sign;
                        } else {
                            t.dy = 0;
                            t.dx = sign;
                        }
                        t.stepsSinceTurn = 0;
                    }
                }

                // Giới hạn chiều dài đuôi vuông góc
                const pts = [...t.history, { x: t.x, y: t.y }];
                let totalLen = 0;
                for (let j = pts.length - 1; j > 0; j--) {
                    const segLen = Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y);
                    if (totalLen + segLen > t.maxLength) {
                        const remain = t.maxLength - totalLen;
                        const ratio = remain / (segLen || 1);
                        pts[j - 1] = {
                            x: pts[j].x - (pts[j].x - pts[j - 1].x) * ratio,
                            y: pts[j].y - (pts[j].y - pts[j - 1].y) * ratio
                        };
                        pts.splice(0, j - 1);
                        t.history = pts.slice(0, pts.length - 1);
                        break;
                    }
                    totalLen += segLen;
                }

                // Kiểm tra ra ngoài màn hình
                if (t.x < -GRID_SIZE || t.x > cw + GRID_SIZE || t.y < -GRID_SIZE || t.y > ch + GRID_SIZE) {
                    t.fading = true;
                }
                if (t.fading) {
                    t.life -= 0.04;
                }

                // Vẽ đường gấp khúc vuông góc
                if (pts.length >= 2 && t.life > 0) {
                    ctx.save();
                    ctx.strokeStyle = `rgba(22, 78, 58, ${0.34 * t.life})`;
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(pts[0].x + 0.5, pts[0].y + 0.5);
                    for (let k = 1; k < pts.length; k++) {
                        ctx.lineTo(pts[k].x + 0.5, pts[k].y + 0.5);
                    }
                    ctx.stroke();

                    // Đầu tia là một ô vuông nhỏ sắc nét (4x4px, không dùng hình tròn)
                    ctx.fillStyle = `rgba(22, 78, 58, ${0.75 * t.life})`;
                    ctx.fillRect(t.x - 2, t.y - 2, 5, 5);
                    ctx.restore();
                }

                if (t.life <= 0) {
                    if (t.isBurst) {
                        traces.splice(i, 1);
                    } else {
                        traces[i] = createOrthogonalTrace();
                    }
                }
            }

            requestAnimationFrame(renderBackgroundFrame);
        }

        requestAnimationFrame(renderBackgroundFrame);
    }

    // 6. HÀM HIỂN THỊ CÂU HỎI (Kèm hiệu ứng trượt ngang theo hướng Next / Prev)
    function renderQuestion(index, direction = 'next') {
        const question = quizQuestions[index];
        const stepNum = index + 1;
        const formattedStep = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;

        $('#questionStepText').text(`Câu hỏi ${stepNum} trên ${totalQuestions}`);
        $('#questionCode').text(formattedStep);

        $('#stepSegments .seg').each(function (i) {
            $(this).removeClass('active done');
            if (i < index) {
                $(this).addClass('done');
            } else if (i === index) {
                $(this).addClass('active');
            }
        });

        // Kích hoạt animation trượt theo hướng (trái -> phải hoặc phải -> trái)
        const $stage = $('#questionSlideStage');
        $stage.removeClass('slide-in-next slide-in-prev');
        void $stage[0].offsetWidth;
        $stage.addClass(direction === 'prev' ? 'slide-in-prev' : 'slide-in-next');

        $('#questionTitle').text(question.title);
        $('#selectionWarning').stop(true, true).slideUp(120);

        const $container = $('#optionsContainer');
        $container.empty();

        const savedAnswer = userAnswers[index];

        question.options.forEach((opt, optIdx) => {
            const isSelected = (savedAnswer && savedAnswer.letter === opt.letter) ? 'selected' : '';
            const cardHtml = `
                <div class="option-card ${isSelected}" data-opt-index="${optIdx}" data-letter="${opt.letter}">
                    <div class="keycap">${opt.letter}</div>
                    <div class="option-text">${opt.text}</div>
                </div>
            `;
            $container.append(cardHtml);
        });

        $('#btnPrev').prop('disabled', index === 0);

        if (index === totalQuestions - 1) {
            $('#btnNext').addClass('d-none');
            $('#btnSubmit').removeClass('d-none');
        } else {
            $('#btnNext').removeClass('d-none');
            $('#btnSubmit').addClass('d-none');
        }
    }

    // 7. SỰ KIỆN CHỌN ĐÁP ÁN
    $('#optionsContainer').on('click', '.option-card', function () {
        $('.option-card').removeClass('selected');
        $(this).addClass('selected');

        const optIdx = parseInt($(this).data('opt-index'), 10);
        userAnswers[currentQuestionIndex] = quizQuestions[currentQuestionIndex].options[optIdx];

        // Kích hoạt tia vuông góc phản hồi trên nền bản vẽ & đóng thanh cảnh báo
        triggerGridBurst();
        $('#selectionWarning').stop(true, true).slideUp(140);
    });

    // 8. HỖ TRỢ BẤM PHÍM A, B, C, D & ENTER
    $(document).on('keydown', function (e) {
        if ($('#quizBody').hasClass('d-none')) return;

        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(key)) {
            const $targetCard = $(`.option-card[data-letter="${key}"]`);
            if ($targetCard.length) {
                $targetCard.trigger('click');
            }
        } else if (e.key === 'Enter') {
            if (currentQuestionIndex < totalQuestions - 1) {
                $('#btnNext').trigger('click');
            } else {
                $('#btnSubmit').trigger('click');
            }
        }
    });

    // 9. ĐIỀU HƯỚNG CÂU TIẾP THEO / CÂU TRƯỚC
    $('#btnNext').on('click', function () {
        if (!userAnswers[currentQuestionIndex]) {
            // Áp dụng jQuery slideDown() khi quên chọn đáp án
            $('#selectionWarning').stop(true, true).slideDown(180);
            return;
        }
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            triggerGridBurst();
            renderQuestion(currentQuestionIndex, 'next');
        }
    });

    $('#btnPrev').on('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex, 'prev');
        }
    });

    // Sự kiện đóng/mở danh sách 10 đáp án đã chọn bằng jQuery slideToggle()
    $('#btnToggleHistory').on('click', function () {
        $('#choicesCollapseBox').stop(true, true).slideToggle(220);
        $('#historyArrow').toggleClass('open');
    });

    // 10. CHỐT KẾT QUẢ & TỔNG HỢP HỒ SƠ CÁ NHÂN
    $('#btnSubmit').on('click', function () {
        if (!userAnswers[currentQuestionIndex]) {
            $('#selectionWarning').stop(true, true).slideDown(180);
            return;
        }

        const dossier = analyzeUserDossier(userAnswers);

        $('#resultTitle').text(dossier.title);
        $('#resultDescription').text(dossier.desc);
        $('#blindSpotText').text(dossier.blindSpot);

        // Render các đặc điểm hành vi cá nhân rút ra từ chính câu trả lời của người dùng
        const $insightsBox = $('#personalInsightsBox');
        $insightsBox.empty();
        dossier.insights.forEach(item => {
            $insightsBox.append(`
                <li class="trait-item">
                    ${item.insight} <span class="trait-ref">(Câu ${item.qIndex})</span>
                </li>
            `);
        });

        // Render danh sách Tech Tags
        const $techContainer = $('#techStackBadges');
        $techContainer.empty();
        dossier.tech.forEach(item => {
            $techContainer.append(`<span class="tech-tag">${item}</span>`);
        });

        // Cập nhật thanh tỷ lệ % chuẩn hóa (chỉ tô đậm thanh cao điểm nhất, còn lại màu đá trầm)
        const { frontend, backend, uiux, data } = dossier.pctMap;
        const maxPct = Math.max(frontend, backend, uiux, data);

        const barConfigs = [
            { pct: frontend, textEl: '#scoreFrontendText', barEl: '#barFrontend' },
            { pct: backend, textEl: '#scoreBackendText', barEl: '#barBackend' },
            { pct: uiux, textEl: '#scoreUiuxText', barEl: '#barUiux' },
            { pct: data, textEl: '#scoreDataText', barEl: '#barData' }
        ];

        barConfigs.forEach(item => {
            $(item.textEl).text('0%');
            const $bar = $(item.barEl);
            const $labelRow = $(item.textEl).parent();
            $bar.css('width', '0%').removeClass('fill-dominant');
            $labelRow.removeClass('stat-top');

            if (item.pct >= maxPct - 3) {
                $bar.addClass('fill-dominant');
                $labelRow.addClass('stat-top');
            }
        });

        // Hiển thị tóm tắt 10 đáp án đã chọn kèm trục chính
        const shortLabel = { frontend: "FE", backend: "BE", uiux: "UX", data: "DATA" };
        const $choicesList = $('#userChoicesList');
        $choicesList.empty();
        for (let i = 0; i < totalQuestions; i++) {
            const ans = userAnswers[i];
            $choicesList.append(`<span class="choice-pill">C${i + 1}: ${ans.letter} (${shortLabel[ans.primary]})</span>`);
        }

        // Mặc định đóng ngăn lịch sử đáp án cho gọn, bấm vào mới slideToggle mở ra
        $('#choicesCollapseBox').hide();
        $('#historyArrow').removeClass('open');

        $('#stepSegments .seg').removeClass('active').addClass('done');
        $('#questionCode').text('10/10');
        $('#questionStepText').text('Đã hoàn thành bài trắc nghiệm');

        // Áp dụng jQuery fadeOut() / fadeIn() và animate() chạy số phần trăm
        $('#quizBody').fadeOut(160, function () {
            $(this).addClass('d-none');
            $('#resultCard').removeClass('d-none').hide().fadeIn(240, function () {
                barConfigs.forEach(item => {
                    $(item.barEl).css('width', `${item.pct}%`);
                    $({ countNum: 0 }).animate(
                        { countNum: item.pct },
                        {
                            duration: 700,
                            easing: 'swing',
                            step: function (now) {
                                $(item.textEl).text(`${Math.round(now)}%`);
                            },
                            complete: function () {
                                $(item.textEl).text(`${item.pct}%`);
                            }
                        }
                    );
                });
            });
        });
    });

    // 11. LÀM LẠI TỪ ĐẦU
    $('#btnRestart').on('click', function () {
        currentQuestionIndex = 0;
        for (let k in userAnswers) delete userAnswers[k];

        $('#resultCard').fadeOut(180, function () {
            $(this).addClass('d-none');
            $('#quizBody').removeClass('d-none').hide().fadeIn(220);
            renderQuestion(0);
        });
    });

    // Khởi chạy câu đầu tiên
    renderQuestion(0);

});
